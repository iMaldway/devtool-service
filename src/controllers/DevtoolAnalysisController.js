const BaseController = require('./BaseController.js')

class Controller extends BaseController {

	constructor() {
		// 先实例化父级
		super('DevtoolAnalysisService')
		return {
			'GET /devtool/analysis': this._get.bind(this),
			'POST /devtool/analysis': this._add.bind(this),
			'DELETE /devtool/analysis': this._remove.bind(this),
			'PUT /devtool/analysis': this._update.bind(this)
		}
	}

}
module.exports = new Controller()
