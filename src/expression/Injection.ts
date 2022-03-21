import fs from "fs";
import path from "path";
import config from "../config/expression";
import InjectionType from "../enum/InjectionType";
let cwd = path.join(__dirname, "../");
cwd = cwd.slice(0, cwd.length - 1);

/**
 * @todo 仅限自动注入Service或者Dao。
 * @param {InjectionType} 参数可选InjectionType.Dao || InjectionType.Service
 */
export default function Injection(params: InjectionType) {
  return function (target: any, key: string) {
    const path =
      params === InjectionType.Dao
        ? cwd + config.daoPath
        : cwd + config.servicePath;
    let JsFiles = fs.readdirSync(path);
    for (let f of JsFiles) {
      let src: string[] = f.split(".");
      if (src[0] === key) {
        console.log(`--自动注入: ${f}...`);
        const Service = require(path + "/" + src[0]);
        let service = new Service();
        target[key] = service;
        break;
      }
    }
  };
}
