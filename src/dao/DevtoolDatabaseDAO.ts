import BaseDao from "./BaseDao";

import Connect from "../driven/MySqlManual";

/**
 * @class
 * @todo tableName为表名。由于Dao继承于BaseDao，所以继承了所有的方法，在BaseDao中需要指定一个操作的表名来进行后续SQL语句操作。
 */
export default class Dao extends BaseDao {
  constructor(tableName: string = "devtool_database") {
    // 先实例化父级
    super(tableName);
  }

  /** *
   * @todo 接收数据库连接信息，按照信息创立一个数据库连接并执行查询该数据库下所有的表格信息
   * @param {String} host 地址
   * @param {String} port 端口
   * @param {String} username 用于登录的账户名
   * @param {String} password 该账户名的密码
   * @param {String} database 数据库名称
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  getTables({ host, port, username, password, database }) {
    const _sql =
      "SELECT table_Name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA=?;";
    let errro: any = null;
    let promise: any = null;
    try {
      // 创建连接
      const MySql = new Connect(host, port, username, password, database);
      const parameter: any = [database || MySql.database];
      promise = MySql.query(_sql, parameter);
    } catch (e) {
      errro = e;
      console.log(e);
    }
    if (promise && !errro) {
      return promise;
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 接收数据库连接信息，按照信息创立一个数据库连接并执行查询该数据库下指定表格的列信息
   * @param {String} host 地址
   * @param {String} port 端口
   * @param {String} username 用于登录的账户名
   * @param {String} password 该账户名的密码
   * @param {String} database 数据库名称
   * @param {String} tablename 表名称
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  getTableInfo({ host, port, username, password, database, tableName }) {
    const _sql = `SELECT 
            TABLE_SCHEMA,TABLE_NAME,COLUMN_NAME ,ORDINAL_POSITION ,
            COLUMN_DEFAULT ,IS_NULLABLE ,DATA_TYPE ,COLUMN_COMMENT,COLUMN_KEY  
            FROM information_schema.columns WHERE TABLE_SCHEMA =? AND TABLE_NAME = ?;`;
    let errro: any = null;
    let promise: any = null;
    try {
      // 创建连接
      const MySql = new Connect(host, port, username, password, database);
      const parameter: any = [database || MySql.database, tableName];
      promise = MySql.query(_sql, parameter);
    } catch (e) {
      errro = e;
      console.log(e);
    }
    if (promise && !errro) {
      return promise;
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 返回host集合
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  getHostList() {
    let table = this.tableName;
    const _sql = "SELECT distinct host FROM `" + table + "` ;";
    let errro = null;
    if (_sql != "") {
      console.log(_sql);
      return this.MySql.query(_sql, []);
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }
}
// 将对象实例化并导出
module.exports = Dao;
