const JudgeUtils = require('../utils/JudgeUtils')
const ObjectUtils = require('../utils/ObjectUtils')
const HttpExcetion = require('../class/HttpExcetion')

class BaseService {
	constructor(dao) {
		try {
			if (dao != null) {
				if ((typeof dao) == 'object') {
					this.dao = dao
				} else {
					const boo = dao.indexOf('.js')
					if (boo > 0) {
						this.dao = require('../dao/' + dao)
					} else {
						this.dao = require('../dao/' + dao + '.js')
					}
				}
			}
		} catch (error) {
			console.error(error)
		}
		this.JudgeUtils = JudgeUtils
		this.ObjectUtils = ObjectUtils
		this.HttpExcetion = HttpExcetion
	}

	async add(parameters) {
		// 请求
		var res = await this.dao.add(parameters)
		// 响应
		return res
	}

	async remove(parameters) {
		// 请求
		var res = await this.dao.remove(parameters)
		// 响应
		return res
	}

	async get(parameters) {
		// 请求
		var res = await this.dao.query(parameters)
		var data = {}
		if (parameters && parameters.id) {
			data = res ? res[0] : {}
		} else {
			var resTotal = await this.dao.queryTotal()
			data['list'] = res
			data['total'] = resTotal ? resTotal[0].total : 0
		}
		// 响应
		return data
	}

	async update(parameters) {
		// 请求
		var res = await this.dao.update(parameters)
		// 响应
		return res
	}

	/** *
     * @todo 休眠指定时间
     * @param {*} ms 毫秒
     * @returns String
     */
	wait(ms) {
		return new Promise((resolve) => { setTimeout(() => resolve(), ms) })
	}

	/** *
     * @todo 将传入的字符串中的下划线删除并将后一位大写
     * @param {*} 参数
     * @returns String
     */
	convert(value) {
		const kList = [...value]
		for (let i = 0; i < kList.length;) {
			const char = kList[i]
			// A-Z 对应的 Unicode 编码是 65 - 90
			if (char == '_') {
				// 删除两位，_x 并且将删除的第二位转大写添加进入数组
				kList.splice(i, 2, kList[i + 1].toUpperCase())
				i = i + 2
			} else {
				i++
			}
		}
		return kList.join('')
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

}

module.exports = BaseService
