import BaseController from "./BaseController";

export default class Controller extends BaseController {
  constructor() {
    // 先实例化父级
    super("DevtoolTemplateService");
    this.Api = {
      "GET /devtool/template": this._get.bind(this),
      "POST /devtool/template": this._add.bind(this),
      "DELETE /devtool/template": this._remove.bind(this),
      "PUT /devtool/template": this._update.bind(this),
    };
  }
}

module.exports = Controller;
