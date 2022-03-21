const BaseService = require("./BaseService");

const puppeteer = require("puppeteer");

export default class Service extends BaseService {
  public applicationPage;

  constructor() {
    // 先实例化父级
    super();
  }

  /**
   * @todo 获取解析输出
   * @param {url} 解析地址
   * @param {body} 解析规则
   */
  async getAnalysisOutPut(url: string, body: string) {
    const output = {};
    const width: number = 1024;
    const height: number = 1024;
    try {
      let browser = await puppeteer.launch({
        devtools: false,
        args: [
          "--disable-gpu",
          "--disable-dev-shm-usage",
          "--disable-setuid-sandbox",
          "--no-first-run",
          "--no-sandbox",
          "--no-zygote",
          "--single-process",
        ],
        defaultViewport: { width: width, height: height },
      });
      // 建立页面
      this.applicationPage = await browser.newPage();
      this.applicationPage.setDefaultNavigationTimeout(2000000);
      await this.applicationPage.setViewport({ width: width, height: height });
      await this.applicationPage.setUserAgent("UA-TEST");
      // 导航到指定地址
      await this.applicationPage.goto(url, { waitUntil: "domcontentloaded" });
      // 延时等待3秒
      await this.wait(3000);
      // 当解析规则存在的时候
      let analysis: string = body;
      analysis = typeof analysis === "string" ? JSON.parse(analysis) : analysis;
      try {
        await this.analysisContent(analysis, output);
      } catch (error) {
        console.error(error);
      }
      // 保持浏览器打开，直到显式终止进程
      // await browser.waitForTarget(() => false);
      await this.applicationPage.close();
      await browser.close();
    } catch (error) {
      console.error(error);
    }
    return output;
  }
  async clickElement(selector: any, page: any) {
    try {
      await page.evaluate((selector) => {
        let nodes = document.querySelectorAll(selector);
        for (let t = 0; t < nodes.length; t++) {
          let i = nodes[t];
          i.click();
        }
        return Promise.resolve(true);
      }, selector);
    } catch (error) {
      console.log("选中失败：", error);
    }
    return Promise.resolve(true);
  }
  async analysisContent(analysis: any, output: any) {
    // 如果有前置操作则触发一次点击操作
    if (analysis.before) {
      await this.clickElement(analysis.before.selector, this.applicationPage);
    }
    // 如果有输出则输出内容
    if (analysis.output) {
      for (let i = 0; i < analysis.output.length; i++) {
        let itme = analysis.output[i];
        let value = "";
        try {
          // 任何输出都是往对象中添加属性
          value = await this.applicationPage.evaluate((itme) => {
            let element = document.querySelector(itme.selector);
            let attr = null;
            if (element && itme.value) {
              for (let t = 0; t < itme.value.length; t++) {
                if (attr) {
                  attr = attr[itme.value[t]];
                } else {
                  attr = element[itme.value[t]];
                }
              }
            }
            element = null;
            return attr;
          }, itme);
        } catch (error) {
          console.error(error);
        }
        output[itme.name] = value;
      }
    }
    if (analysis.after) {
      await this.clickElement(analysis.after.selector, this.applicationPage);
    }
    if (analysis.children) {
      /**
       * 所有的children都是数组，但每次操作的是数组中某个对象
       */
      if (analysis.children.name) {
        output[analysis.children.name] = [];
      }
      // 获取所有符合的节点，如果存在根节点属性，则从根节点开始寻找
      let newNodes: any[] = [];
      let nowNode = this.applicationPage;
      if (analysis.children.root) {
        nowNode = await this.applicationPage.$(analysis.selector);
      }
      newNodes = await nowNode.$$(analysis.children.selector);

      console.log(
        "document.querySelectorAll('" + analysis.children.selector + "')",
        "节点元素个数",
        newNodes?.length
      );
      // 循环所有节点
      for (let i = 0; i < newNodes.length; i++) {
        let newNode = newNodes[i];
        try {
          // 操作哪个节点就选中哪个节点
          await newNode.click();
          // 往数组中添加一个对象，并在下次迭代中使用这个对象
          output[analysis.children.name].push({});
          await this.analysisContent(
            analysis.children,
            output[analysis.children.name][i]
          );
        } catch (error) {
          console.error("递归异常：", error);
        } finally {
          // 销毁
          if (newNode && newNode.dispose) {
            newNode.dispose();
          }
        }
      }
      console.log("---------");
    }
    return Promise.resolve(true);
  }
}
module.exports = Service;
