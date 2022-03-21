import BaseService from "./BaseService";

export default class Service extends BaseService {
  constructor() {
    // 先实例化父级
    super("DevtoolGeneratorConfigDAO");
  }
}

module.exports = Service;
