import Hold from "../expression/Hold";
import BaseServiceInterface from "../interface/BaseServiceInterface";

export default class BaseService implements BaseServiceInterface {
  public dao: any;

  @Hold("/class")
  public HttpExcetion: any;

  @Hold("/utils")
  public JudgeUtils: any;

  @Hold("/utils")
  public ObjectUtils: any;

  constructor(dao: any) {
    try {
      if (dao != null) {
        if (typeof dao == "object") {
          this.dao = dao;
        } else {
          const TargetDao = require("../dao/" + dao);
          this.dao = new TargetDao();
          // import('../dao/' + dao).then((dao)=>{
          // 	this.dao = dao
          // })
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async add(parameters: any) {
    // 请求
    const res = await this.dao.add(parameters);
    // 响应
    return res;
  }

  async remove(parameters: any) {
    // 请求
    const res = await this.dao.remove(parameters);
    // 响应
    return res;
  }

  async get(parameters: any) {
    let data = {};
    try {
      // 请求
      const res = await this.dao.query(parameters);
      const resTotal = await this.dao.queryTotal(parameters);
      if (parameters && parameters.id) {
        data = res ? res[0] : {};
      } else {
        console.log(resTotal);
        data["list"] = res;
        data["total"] = resTotal ? resTotal[0].total : 0;
      }
    } catch (error) {
      console.error(error);
    }
    // 响应
    return data;
  }

  async update(parameters: any) {
    // 请求
    const res = await this.dao.update(parameters);
    // 响应
    return res;
  }

  /** *
   * @todo 休眠指定时间
   * @param {*} ms 毫秒
   * @returns String
   */
  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });
  }

  /** *
   * @todo 将传入的字符串中的下划线删除并将后一位大写
   * @param {*} 参数
   * @returns String
   */
  convert(value: any) {
    const kList = [...value];
    for (let i = 0; i < kList.length; ) {
      const char = kList[i];
      // A-Z 对应的 Unicode 编码是 65 - 90
      if (char == "_") {
        // 删除两位，_x 并且将删除的第二位转大写添加进入数组
        kList.splice(i, 2, kList[i + 1].toUpperCase());
        i = i + 2;
      } else {
        i++;
      }
    }
    return kList.join("");
  }

  /** *
   * @todo 必须的数据
   * @param {*} 参数
   * @returns HttpExcetion
   */
  required(parameter: any, errorMessages: any, code = 400) {
    if (
      this.JudgeUtils.isBlank(parameter) ||
      this.JudgeUtils.isBlankString(parameter)
    ) {
      throw new this.HttpExcetion(errorMessages, code);
    }
  }

  /** *
   * @todo 不能为空的检查。如果检查的数值不存在，则抛出异常。如果是数组并且查不到数据，则抛出异常。
   * @param {*} 参数
   * @returns HttpExcetion
   */
  notNull(parameter: any, errorMessages: any, code = 400) {
    // 如果 检查的数值不存在，则抛出异常
    if (!parameter) {
      throw new this.HttpExcetion(errorMessages, code);
    } else {
      // 如果是数组并且查不到数据，则抛出异常
      if (this.ObjectUtils.isArrayFn(parameter) && parameter.length <= 0) {
        throw new this.HttpExcetion(errorMessages, code);
      }
    }
  }
}

module.exports = BaseService;
