const BaseController = require('./BaseController.js')

class Controller extends BaseController {

	constructor() {
		// 先实例化父级
		super('DevtoolGeneratorConfigService')
		return {
			'GET /devtool/config': this._get.bind(this),
			'POST /devtool/config': this._add.bind(this),
			'DELETE /devtool/config': this._remove.bind(this),
			'PUT /devtool/config': this._update.bind(this)
		}

	}

}

module.exports = new Controller()
