/*eslint no-unused-vars: "warn"*/
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示
import Koa from "koa";
import koaBody from "koa-body";
// 导入全局配置信息
import config from "./config/default";
// node路径相关解析模块
import path from "path";
// 解析request的body
import bodyParser from "koa-bodyparser";
// 注意require('koa-router')返回的是函数:
// const router = require('koa-router')()
// 静态文件
import koaStatic from "koa-static";
// 导入响应主体
let HttpResponse = require("./class/HttpResponse");
// 创建app
const app = new Koa();
// 导入全局异常处理类
import CatchErroe from "./middleware/CatchErroe";
// 对后续所有的操作进行容错处理
app.use(CatchErroe);
// koa配置设置
app.use(
  koaBody({
    multipart: true,
    strict: false, // 设为false
    formidable: {
      maxFileSize: 200 * 1024 * 1024,
    },
  })
);
// 配置跨域
app.use(async (ctx: any, next: any) => {
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "PUT,DELETE,POST,GET");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 3600 * 24);
  await next();
});
// log request URL:
app.use(async (ctx: any, next: any) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
// 执行时间
app.use(async (ctx: any, next: any) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});
// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, "./public")));
// 挂载解析
app.use(bodyParser());
// 导入自动扫描控制器函数
import controller from "./AddMiddleware";
// 挂载到路由上
app.use(controller());

// 处理不存在的路由
app.use(async (ctx: any, next: any) => {
  await next();
  // 没有响应体则返回404
  if (!ctx.body) {
    ctx.status = 404;
    ctx.body = new HttpResponse(null, 404, "内容不存在");
  }
});

// 导入处理请求之后函数
import responseAfter from "./middleware/ResponseAfter";
app.use(responseAfter);

// 监听3000端口
app.listen(config.port);
console.log("应用程序启动端口 " + config.port + "...");
