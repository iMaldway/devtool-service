const BaseService = require('./BaseService.js')

class Service extends BaseService {

	constructor() {
		// 先实例化父级
		super('DevtoolTemplateFileDAO')
	}

}

module.exports = new Service()
