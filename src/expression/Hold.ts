import fs from "fs";
import path from "path";
let cwd = path.join(__dirname, "../");
cwd = cwd.slice(0, cwd.length - 1);

/**
 * @todo 使用此注解的属性将持有该属性名对象，不会进行实例化（no new）。
 * @param params {string} 以项目顶层文件夹往下查找路径，与文件系统无关。例：/src/class
 * @param fileName {string} 如果存在此属性，则将载入与此属性名同名文件，不带后缀。不存在则按照当前注解值得key载入文件。
 */
export default function Hold(params: string, fileName?: string) {
  return function (target: any, key: string) {
    const path = cwd + params;
    let JsFiles = fs.readdirSync(path);
    for (let f of JsFiles) {
      let src: string[] = f.split(".");
      const compare = fileName ? fileName : key;
      if (src[0] === compare) {
        console.log(`--自动持有: ${f}...`);
        target[key] = require(path + "/" + src[0]);
        break;
      }
    }
  };
}
