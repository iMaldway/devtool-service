const HttpResponse = require('../class/HttpResponse')
const HttpExcetion = require('../class/HttpExcetion')
const JudgeUtils = require('../utils/JudgeUtils')
const ObjectUtils = require('../utils/ObjectUtils')

import BaseControllerInterface from '../interface/BaseControllerInterface'

export default class BaseController implements BaseControllerInterface{

	public service;
	public HttpExcetion = HttpExcetion;
	public HttpResponse = HttpResponse;
	public JudgeUtils = JudgeUtils;
	public ObjectUtils = ObjectUtils;

	constructor(service) {
		if (service != null) {
			if ((typeof service) == 'object') {
				this.service = service
			} else {
				// this.service = require('../service/' + service)
				const TargetService = require('../service/' + service)
				this.service = new TargetService();
			}
		}
	}

	async _add(ctx, next) {
		var parameters = ctx.request.body
		// 请求
		var res = await this.service.add(parameters)
		// 响应
		ctx.response.body = new this.HttpResponse(res)
		await next()
	}

	async _remove (ctx, next) {
		var parameters = ctx.request.body
		// 检查
		this.required(parameters.id, 'id是必须的')
		// 请求
		var res = await this.service.remove(parameters)
		// 响应
		ctx.response.body = new this.HttpResponse(res)
		await next()
	}

	async _get (ctx, next) {
		const parameters = ctx.request.query
		// 请求
		var data = await this.service.get(parameters)
		// 响应
		ctx.response.body = new this.HttpResponse(data)
		await next()
	}

	async _update (ctx, next) {
		var parameters = ctx.request.body
		// 检查
		this.required(parameters.id, 'id是必须的')
		// 请求
		var res = await this.service.update(parameters)
		// 响应
		ctx.response.body = new this.HttpResponse(res)
		await next()
	}

	/** *
     * @todo 必须的数据
     * @param {*} 参数
     * @returns HttpExcetion
     */
	required(parameter, errorMessages, code = 400) {
		if (this.JudgeUtils.isBlank(parameter) || this.JudgeUtils.isBlankString(parameter)) {
			throw new this.HttpExcetion(errorMessages, code)
		}
	}

	/** *
     * @todo 不能为空的检查。如果检查的数值不存在，则抛出异常。如果是数组并且查不到数据，则抛出异常。
     * @param {*} 参数
     * @returns HttpExcetion
     */
	notNull(parameter, errorMessages, code = 400) {
		// 如果 检查的数值不存在，则抛出异常
		if (!parameter) {
			throw new this.HttpExcetion(errorMessages, code)
		} else {
			// 如果是数组并且查不到数据，则抛出异常
			if (ObjectUtils.isArrayFn(parameter) && parameter.length <= 0) {
				throw new this.HttpExcetion(errorMessages, code)
			}
		}
	}

	resolve(fn) {
		return this[fn].bind(this)
	}

}
module.exports = BaseController
