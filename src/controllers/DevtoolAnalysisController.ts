const BaseController = require('./BaseController')

export default class Controller extends BaseController {

	public Api;
	constructor() {
		// 先实例化父级
		super('DevtoolAnalysisService')
		this.Api = {
			'GET /devtool/analysis': this._get.bind(this),
			'POST /devtool/analysis': this._add.bind(this),
			'DELETE /devtool/analysis': this._remove.bind(this),
			'PUT /devtool/analysis': this._update.bind(this)
		}
	}

}
module.exports = Controller
