/** *
 * @class 通用交互对象
 */
export default class HttpResponse {
  public data: any;
  public code: number;
  public message: string;
  public errors: Error | undefined;

  /**
   * @constructor
   * @param {String} data 处理结果集
   * @param {Number} code 本次请求状态
   * @param {String} message 本次请求说明信息
   * @param {Object} errors 包含的错误信息
   */
  constructor(data?: any, errors?: Error, code = 200, message = "操作成功") {
    if (this.isArrayFn(data)) {
      this.data = { list: data };
    } else {
      this.data = data;
    }
    this.code = code;
    this.message = message;
    this.errors = errors;
  }

  isArrayFn(value: any) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
}
module.exports = HttpResponse;
