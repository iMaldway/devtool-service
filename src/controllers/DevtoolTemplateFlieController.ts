import BaseController from "./BaseController";

export default class Controller extends BaseController {
  constructor() {
    // 先实例化父级
    super("DevtoolTemplateFlieService");
    this.Api = {
      "GET /devtool/template/file": this._get.bind(this),
      "POST /devtool/template/file": this._add.bind(this),
      "DELETE /devtool/template/file": this._remove.bind(this),
      "PUT /devtool/template/file": this._update.bind(this),
    };
  }
}

module.exports = Controller;
