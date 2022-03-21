const { tableToResult } = require("../utils/TransformationUtil");
const HttpResponse = require("../class/HttpResponse");

import { RequestTypeEnum } from "../enum/HttpEnum";

// 导出函数
const ResponseAfter = async function (ctx: any, next: any) {
  let data = null;
  const url = ctx.url;
  console.log("Response URL: ", url);
  switch (ctx.method) {
    case RequestTypeEnum.GET:
      data = tableToResult(ctx.response.body);
      break;
    case RequestTypeEnum.POST:
      data = tableToResult(ctx.response.body);
      break;
    case RequestTypeEnum.DELETE:
      data = tableToResult(ctx.response.body);
      break;
    case RequestTypeEnum.PUT:
      data = tableToResult(ctx.response.body);
      break;
    default:
      data = new HttpResponse(null, 500, "不支持的请求类型", null);
      break;
  }
  ctx.response.body = data;
  await next();
};
module.exports = ResponseAfter;
export default ResponseAfter;
