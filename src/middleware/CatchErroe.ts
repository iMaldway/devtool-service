const HttpExcetion = require('../class/HttpExcetion')
const HttpResponse = require('../class/HttpResponse')

const CatchErroe = async (ctx, next) => {
	try {
		await next()
	} catch (error:any) {
		console.error(error)
		const results = new HttpResponse()
		if (error instanceof HttpExcetion) {
			results.data = null
			results.code = error.code
			results.message = error.message
			results.error = error
		} else {
			results.data = null
			results.code = 500
			let message = ''
			switch (error.code) {
				case 'ER_DUP_ENTRY':
					message = '违反唯一约束条件，请检查属性值是否重复'
					break
				case 'ER_PARSE_ERROR':
					message = '数据库执行错误'
					break
				case 401:
					message = '未授权客户机访问数据'
					break
				case 403:
					message = '禁止访问'
					break
				case 404:
					message = '内容不存在'
					break
				case 415:
					message = '服务器拒绝服务请求，因为不支持请求实体的格式'
					break
				case 501:
					message = '服务器不支持请求的工具'
					break
				case 502:
					message = '服务器接收到来自上游服务器的无效响应'
					break
				case 503:
					message = '由于临时过载或维护，服务器无法处理请求'
					break
				default:
					message = '服务器错误，请稍后再试'
					break
			}
			results.message = message
			results.error = error
		}
		ctx.body = results
		return ctx.body
	}
}


module.exports = CatchErroe
export default CatchErroe