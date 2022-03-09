/*eslint no-path-concat: "warn"*/
/*eslint no-unused-vars: "warn"*/
const fs = require('fs')
const KoaRouter = require('koa-router')
// 扫描白名单,在此名单下的将不会被添加
const whiteList:string[] = ['BaseController.js']
// 扫描指定文件夹下的控制器并将它添加到路由中
function addMapping(router, mapping:[]) :void {
	for (let url in mapping) {
		let path:string = ''
		if (url.startsWith('GET ')) {
			path = url.substring(4)
			router.get(path, mapping[url])
		} else if (url.startsWith('POST ')) {
			path = url.substring(5)
			router.post(path, mapping[url])
		} else if (url.startsWith('DELETE ')) {
			path = url.substring(7)
			router.delete(path, mapping[url])
		} else if (url.startsWith('PUT ')) {
			path = url.substring(4)
			router.put(path, mapping[url])
		} else {
			console.log(`无效的URL: ${url}`)
		}
	}
}

/**
 * 去重
 */
function merge(source:[], target:[]) :[] {
	const and = [...source, ...target]
	const output:[] = []
	for (let i = 0; i < and.length; i++) {
		const it = and[i]
		let w = null
		for (let t = i + 1; t < and.length; t++) {
			const tt = and[t]
			if (it == tt) {
				w = tt
			}
		}
		if (w == null) {
			output.push(it)
		}
	}
	return output
}

/**
 * target:白名单
 * source:综合
 */
function eliminate(source:string[], target:string[]) :string[] {
	for (let i = 0; i < target.length; i++) {
		const it = target[i]
		for (let t = 0; t < source.length; t++) {
			let st = source[t]
			if (st == it) {
				st = ''
			}
		}
	}
	return source.filter(function (s) {
		return s && s !== '' && (s + '').trim()
	})
}

function addControllers(router, dir:string) :void {
	let files = fs.readdirSync(__dirname + '/' + dir)
	let JsFiles:string[] = eliminate(files, whiteList)
	for (var f of JsFiles) {
		console.log(`添加控制器: ${f}...`)
		const Controller = require(__dirname + '/' + dir + '/' + f)
		let mapping = new Controller();
		addMapping(router, mapping.Api)
	}
}

// 导出动态挂载控制器函数
module.exports = function (dir:string = 'controllers') {
	// 如果不传参数，扫描目录默认为'controllers'
	const router = KoaRouter()
	addControllers(router, dir)
	return router.routes()
}
