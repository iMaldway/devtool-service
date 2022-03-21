let mysql = require("mysql");
/**
 * @class 手动连接数据库
 */
export default class Connect {
  public host: string;
  public username: string;
  public password: string;
  public database: string;
  public port: string;

  public connection;

  constructor(
    host: string,
    port: string,
    username: string,
    password: string,
    database: string
  ) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.database = database;
    this.port = port;
  }

  /**
   * @todo 查询
   * @param sql 接收的sql语句
   * @param values 接受的参数： 为数组
   */
  query(sql: string, values: []) {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection({
        host: this.host,
        user: this.username,
        password: this.password,
        database: this.database,
      });
      this.connection.connect();
      this.connection.query(sql, values, (err: Error, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
          this.connection.end();
        }
      });
    });
  }
}
