const { tableToResult } = require('../utils/TransformationUtil')
const Response = require('../class/Response')
// 导出函数
module.exports = async function (ctx, next) {
	let data = null
	const url = ctx.url
	console.log('Response URL: ', url)
	switch (ctx.method) {
		case 'GET':
			data = tableToResult(ctx.response.body)
			break
		case 'POST':
			data = tableToResult(ctx.response.body)
			break
		case 'DELETE':
			data = tableToResult(ctx.response.body)
			break
		case 'PUT':
			data = tableToResult(ctx.response.body)
			break
		default:
			data = new Response(null, 500, '不支持的请求类型', null)
			break
	}
	ctx.response.body = data
	await next()
}
