const BaseService = require("./BaseService");

export default class Service extends BaseService {
  constructor() {
    // 先实例化父级
    super("DevtoolDatabaseDAO");
  }

  /**
   * @todo 获取指定数据库表格列表
   * @param {*} parameters
   */
  async getTables(parameters: any) {
    // 请求
    var res = await this.dao.getTables(parameters);
    // 响应
    return res;
  }

  /**
   *  @todo 获取指定数据库表格列详细信息
   */
  async getTableInfo(parameters: any) {
    // 请求
    var res = await this.dao.getTableInfo(parameters);
    // 响应
    return res;
  }

  /**
   *  @todo 获取host(去重)集合
   */
  async getHostList() {
    // 请求
    var res = await this.dao.getHostList();
    // 响应
    return res;
  }
}

module.exports = Service;
