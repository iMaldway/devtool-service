import BaseController from "./BaseController";
/**
 * @todo 生成Api
 */

export default class Controller extends BaseController {
  constructor() {
    // 先实例化父级
    super("CodeGenerationService");
    this.Api = {
      "POST /code/generation/build": this._build.bind(this),
      "POST /code/generation/analysis": this._buildByAnalysis.bind(this),
    };
  }

  /**
   * @todo 生成代码
   * @param {*} ctx
   * @param {*} next
   */
  async _build(ctx: any, next: any) {
    var parameters = ctx.request.body;
    // 检查
    this.required(parameters.host, "host是必须的");
    this.required(parameters.port, "port是必须的");
    this.required(parameters.username, "username是必须的");
    this.required(parameters.password, "password是必须的");
    this.required(parameters.database, "database是必须的");
    this.required(parameters.tableName, "表名是必须的");
    this.required(parameters.templateName, "模板名是必须的");
    this.required(parameters.generatorConfigName, "配置名是必须的");

    const res = await this.service.build(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }

  /**
   * @todo 生成代码
   * @param {*} ctx
   * @param {*} next
   */
  async _buildByAnalysis(ctx: any, next: any) {
    var parameters = ctx.request.body;
    // 检查
    this.required(parameters.templateName, "模板名是必须的");
    this.required(parameters.analysisId, "解析ID是必须的");
    const res = await this.service.buildByAnalysis(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }
}

module.exports = Controller;
