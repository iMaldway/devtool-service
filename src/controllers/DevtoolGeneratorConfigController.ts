const BaseController = require('./BaseController')

export default class Controller extends BaseController {

	constructor() {
		// 先实例化父级
		super('DevtoolGeneratorConfigService')
		this.Api = {
			'GET /devtool/config': this._get.bind(this),
			'POST /devtool/config': this._add.bind(this),
			'DELETE /devtool/config': this._remove.bind(this),
			'PUT /devtool/config': this._update.bind(this)
		}

	}

}

module.exports = Controller
