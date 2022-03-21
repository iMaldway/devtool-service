import { resultToTable } from "../utils/TransformationUtil";

import Example from "../expression/Example";

import BaseDaoInterface from "../interface/BaseDaoInterface";

export default class BaseDao implements BaseDaoInterface {
  public tableName: string;
  public resultToTable: any;

  @Example("/driven")
  public MySql: any;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.resultToTable = resultToTable;
  }

  /** *
   * @todo 向指定表格添加一条数据
   * @param {Object} val 参数对象
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  add(val: any) {
    // 转换
    val = resultToTable(val);
    let _sql: string = "";
    let _key: string = "";
    let _valueList: string[] = [];
    let _value: string = "";
    let errro: any = null;
    let table: string = this.tableName;
    try {
      _sql = "INSERT INTO  `" + table + "`  ( ";
      // 循环处理
      for (const key in val) {
        if (key == "id") {
          continue;
        }
        const value: string = val[key];
        _key += "`" + key + "`,";
        _value += "?,";
        _valueList.push(value);
      }
      // 去除最后一个逗号
      _key = _key.substring(0, _key.length - 1);
      _value = _value.substring(0, _value.length - 1);
      // 拼接SQL
      _sql = _sql + _key + " ) VALUES ( " + _value + " );";
      console.log(_sql);
    } catch (e) {
      // TODO handle the exception
      errro = e;
      console.log(e);
    }
    if (_sql != "") {
      return this.MySql.query(_sql, _valueList);
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 向指定表格删除一条数据
   * @param {Object} val 参数对象
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  remove(val: any) {
    // 转换
    val = resultToTable(val);
    let _sql: string = "";
    let _key: string = "";
    let _valueList: string[] = [];
    let errro: any = null;
    let table: string = this.tableName;
    try {
      _sql = "DELETE FROM  `" + table + "`  WHERE 1=1 AND ";
      // 循环处理
      for (const key in val) {
        if (key == "id") {
          const isId: boolean = Array.isArray(val[key]);
          const ids: string[] = isId ? val[key] : [val[key]];
          let _id_sql: string = " IN ( ";
          for (let i = 0; i < ids.length; i++) {
            _id_sql += "?,";
          }
          _id_sql = _id_sql.substring(0, _id_sql.length - 1);
          _id_sql += ") ";
          _key += key + _id_sql + " AND ";
          _valueList.push(...ids);
        } else {
          _key += key + " = ? AND ";
          _valueList.push(val[key]);
        }
      }
      _sql = _sql + _key;
      _sql = _sql.substring(0, _sql.length - 4);
      _sql += ";";
      console.log(_sql);
    } catch (e) {
      errro = e;
      console.log(e);
    }
    if (_sql != "") {
      return this.MySql.query(_sql, _valueList);
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 向指定表格查询数据，如果包含ID字段则按照该ID查询匹配的一条数据
   * @param {Object} val 参数对象
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  query(val: any): Promise<Object> {
    val = resultToTable(val);
    let _sql: string = "";
    let _key: string = "";
    let _valueList: string[] = [];
    let errro: any = null;
    let table: string = this.tableName;

    const pageNumber: number =
      val.page_number || val.pageNumber ? val.page_number - 1 : 0;
    const pageSize: number = val.page_size || val.pageSize ? val.page_size : 1;

    val.page_number = undefined;
    val.page_size = undefined;
    delete val.page_number;
    delete val.page_size;

    try {
      _sql = "SELECT SQL_CALC_FOUND_ROWS * FROM `" + table + "` WHERE 1=1 AND ";
      // 循环处理
      for (const key in val) {
        if (typeof val[key] === "string") {
          _key += key + " LIKE ? AND ";
          _valueList.push("%" + val[key] + "%");
        } else {
          _key += key + " = ? AND ";
          _valueList.push(val[key]);
        }
      }
      _sql = _sql + _key;
      _sql = _sql.substring(0, _sql.length - 4);
      // 增加分页
      _sql += ` limit ${pageNumber * pageSize},${pageSize} `;
      _sql += ";";
      console.log(_sql);
    } catch (e) {
      errro = e;
      console.log(e);
    }
    if (_sql != "") {
      return this.MySql.query(_sql, _valueList);
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 查询上次检索之后总行数
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  queryTotal(val: any) {
    val = resultToTable(val);
    let _sql: string = "";
    let _key: string = "";
    let _valueList: string[] = [];
    let errro: any = null;
    let table: string = this.tableName;

    val.page_number = undefined;
    val.page_size = undefined;
    delete val.page_number;
    delete val.page_size;

    try {
      _sql = "SELECT COUNT(*) as total FROM `" + table + "` WHERE 1=1 AND ";
      // 循环处理
      for (const key in val) {
        if (typeof val[key] === "string") {
          _key += key + " LIKE ? AND ";
          _valueList.push("%" + val[key] + "%");
        } else {
          _key += key + " = ? AND ";
          _valueList.push(val[key]);
        }
      }
      _sql = _sql + _key;
      _sql = _sql.substring(0, _sql.length - 4);
      _sql += ";";
      console.log(_sql);
    } catch (e) {
      errro = e;
      console.log(e);
    }
    if (_sql != "") {
      return this.MySql.query(_sql, _valueList);
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 向指定表格修改一条数据,必须包含ID数据作为索引查询
   * @param {Object} val 参数对象
   * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
   */
  update(val: any) {
    // 转换
    val = resultToTable(val);
    let _sql: string = "";
    let _key: string = "";
    let _valueList: string[] = [];
    let errro: any = null;
    let table: string = this.tableName;
    try {
      _sql = "UPDATE  `" + table + "` SET ";
      // 循环处理
      for (const key in val) {
        if (key == "id") {
          continue;
        }
        const value = val[key];
        _key += "`" + key + "` = ? ,";
        _valueList.push(value);
      }
      // 去除最后一个逗号
      _key = _key.substring(0, _key.length - 1);
      // 拼接SQL
      _sql = _sql + _key + " WHERE id=?;";
      _valueList.push(val.id);
      console.log(_sql);
    } catch (e) {
      // TODO handle the exception
      errro = e;
      console.log(e);
    }
    if (_sql != "") {
      return this.MySql.query(_sql, _valueList);
    } else {
      return Promise.reject(new Error(errro || "Error"));
    }
  }

  /** *
   * @todo 设置该对象的表名
   * @param {String} tableName 表名
   */
  setTableName(tableName: string) {
    this.tableName = tableName;
  }
  /** *
   * @todo 获取该对象的表名
   * @returns 该对象设置的表名。
   */
  getTableName() {
    return this.tableName;
  }
}

module.exports = BaseDao;
