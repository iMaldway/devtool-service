import Hold from "../expression/Hold";

export default class Basicservice {
  @Hold("/class")
  public HttpExcetion: any;

  @Hold("/utils")
  public JudgeUtils: any;

  @Hold("/utils")
  public ObjectUtils: any;

  constructor() {}

  /** *
   * @todo 休眠指定时间
   * @param {*} ms 毫秒
   * @returns String
   */
  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), ms);
    });
  }

  /** *
   * @todo 将传入的字符串中的下划线删除并将后一位大写
   * @param {*} 参数
   * @returns String
   */
  convert(value: any) {
    const kList = [...value];
    for (let i = 0; i < kList.length; ) {
      const char = kList[i];
      // A-Z 对应的 Unicode 编码是 65 - 90
      if (char == "_") {
        // 删除两位，_x 并且将删除的第二位转大写添加进入数组
        kList.splice(i, 2, kList[i + 1].toUpperCase());
        i = i + 2;
      } else {
        i++;
      }
    }
    return kList.join("");
  }

  /** *
   * @todo 必须的数据
   * @param {*} 参数
   * @returns HttpExcetion
   */
  required(parameter: any, errorMessages: any, code = 400) {
    if (
      this.JudgeUtils.isBlank(parameter) ||
      this.JudgeUtils.isBlankString(parameter)
    ) {
      throw new this.HttpExcetion(errorMessages, code);
    }
  }

  /** *
   * @todo 不能为空的检查。如果检查的数值不存在，则抛出异常。如果是数组并且查不到数据，则抛出异常。
   * @param {*} 参数
   * @returns HttpExcetion
   */
  notNull(parameter: any, errorMessages: any, code = 400) {
    // 如果 检查的数值不存在，则抛出异常
    if (!parameter) {
      throw new this.HttpExcetion(errorMessages, code);
    } else {
      // 如果是数组并且查不到数据，则抛出异常
      if (this.ObjectUtils.isArrayFn(parameter) && parameter.length <= 0) {
        throw new this.HttpExcetion(errorMessages, code);
      }
    }
  }
}

module.exports = Basicservice;
