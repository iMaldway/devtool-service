import Hold from "../expression/Hold";

import BaseControllerInterface from "../interface/BaseControllerInterface";

export default class BaseController implements BaseControllerInterface {
  public service: any;

  public Api: any;

  @Hold("/class")
  public HttpResponse: any;

  @Hold("/class")
  public HttpExcetion: any;

  @Hold("/utils")
  public JudgeUtils: any;

  @Hold("/utils")
  public ObjectUtils: any;

  constructor(service: any) {
    if (service != null) {
      if (typeof service == "object") {
        this.service = service;
      } else {
        // this.service = require('../service/' + service)
        const TargetService = require("../service/" + service);
        this.service = new TargetService();
      }
    }
  }

  async _add(ctx: any, next: any) {
    var parameters = ctx.request.body;
    // 请求
    var res = await this.service.add(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }

  async _remove(ctx: any, next: any) {
    var parameters = ctx.request.body;
    // 检查
    this.required(parameters.id, "id是必须的");
    // 请求
    var res = await this.service.remove(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
  }

  async _get(ctx: any, next: any) {
    const parameters = ctx.request.query;
    // 请求
    var data = await this.service.get(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(data);
    await next();
  }

  async _update(ctx: any, next: any) {
    var parameters = ctx.request.body;
    // 检查
    this.required(parameters.id, "id是必须的");
    // 请求
    var res = await this.service.update(parameters);
    // 响应
    ctx.response.body = new this.HttpResponse(res);
    await next();
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

  resolve(fn: string) {
    return this[fn].bind(this);
  }
}
module.exports = BaseController;
