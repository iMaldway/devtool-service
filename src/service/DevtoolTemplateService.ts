const BaseService = require('./BaseService')

export default class Service extends BaseService {

	constructor() {
		// 先实例化父级
		super('DevtoolTemplateDAO')
	}

}

module.exports = Service
