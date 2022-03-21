import BaseController from "./BaseController";

/**
 * @todo 根据网页内容生成Api
 */

export default class Controller extends BaseController {
  constructor() {
    // 先实例化父级
    super("GenerateAPIService");
    this.Api = {
      "POST /generate/api/test": this._test.bind(this),
    };
  }
  /**
   * @todo 测试，指定url与配置json进行读写，返回结果给用户确认是否符合预期
   * @param {*} ctx
   * @param {*} next
   */
  async _test(ctx: any, next: any) {
    var parameters = ctx.request.body;
    // 检查
    this.required(parameters.url, "url是必须的");
    this.required(parameters.body, "配置json是必须的");
    const output = await this.service.getAnalysisOutPut(parameters);
    ctx.response.body = new this.HttpResponse(output);
    await next();
  }
}

module.exports = Controller;
