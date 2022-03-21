const BaseController = require("./BaseController");

export default class Controller extends BaseController {
  constructor() {
    // 先实例化父级
    super("DevtoolDatabaseService");
    this.Api = {
      "GET /devtool/database": this._get.bind(this),
      "POST /devtool/database": this._add.bind(this),
      "DELETE /devtool/database": this._remove.bind(this),
      "PUT /devtool/database": this._update.bind(this),

      "GET /devtool/database/tables": this._getTables.bind(this),
      "GET /devtool/database/table/info": this._getTableInfo.bind(this),
      "GET /devtool/database/host": this._getHostList.bind(this),
    };
  }

  /**
   * @todo 获取指定数据库表格列表
   * @param {*} ctx
   * @param {*} next
   */
  async _getTables(ctx: any, next: any) {
    const parameters = ctx.request.query;
    // 请求
    var res = await this.service.getTables(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }

  /**
   *  @todo 获取指定数据库表格列详细信息
   */
  async _getTableInfo(ctx: any, next: any) {
    const parameters = ctx.request.query;
    // 检查
    this.required(parameters.tableName, "表名是必须的");
    // 请求
    var res = await this.service.getTableInfo(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }

  /**
   *  @todo 获取host(去重)集合
   */
  async _getHostList(ctx: any, next: any) {
    // 请求
    var res = await this.service.getHostList();
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }
}

module.exports = Controller;
