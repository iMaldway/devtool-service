/*eslint no-unused-vars: "warn"*/
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa')
const koaBody = require('koa-body')
// 导入全局配置信息
var config = require('./config/default.js')
// node路径相关解析模块
var path = require('path')
// 解析request的body
const bodyParser = require('koa-bodyparser')
// 注意require('koa-router')返回的是函数:
// const router = require('koa-router')()
// 静态文件
var koaStatic = require('koa-static')
// 导入响应主体
const Response = require('./src/class/Response')
// 创建app
const app = new Koa()
// 导入全局异常处理类
const CatchErroe = require('./src/middleware/CatchErroe')
// 对后续所有的操作进行容错处理
app.use(CatchErroe)
// koa配置设置
app.use(koaBody({
	multipart: true,
	strict: false, // 设为false
	formidable: {
		maxFileSize: 200 * 1024 * 1024
	}
}))
// 配置跨域
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
	ctx.set('Access-Control-Allow-Origin', '*')
	ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET')
	ctx.set('Access-Control-Allow-Credentials', true)
	ctx.set('Access-Control-Max-Age', 3600 * 24)
	await next()
})
// log request URL:
app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
	await next()
})
// 执行时间
app.use(async (ctx, next) => {
	const start = new Date().getTime() // 当前时间
	await next() // 调用下一个middleware
	const ms = new Date().getTime() - start // 耗费时间
	console.log(`Time: ${ms}ms`) // 打印耗费时间
})
// 配置静态资源加载中间件
app.use(koaStatic(
	path.join(__dirname, './public')
))
// 挂载解析
app.use(bodyParser())
// 导入自动扫描控制器函数
const controller = require('./AddMiddleware.js')
// 挂载到路由上
app.use(controller())

// 处理不存在的路由
app.use(async (ctx, next) => {
	await next()
	// 没有响应体则返回404
	if (!ctx.body) {
		ctx.status = 404
		ctx.body = new Response(null, 404, '内容不存在')
	}
})

// 导入处理请求之后函数
const responseAfter = require('./src/middleware/ResponseAfter.js')
app.use(responseAfter)


// 监听3000端口
app.listen(config.port)
console.log('应用程序启动端口 ' + config.port + '...')
