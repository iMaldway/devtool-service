/*eslint no-path-concat: "warn"*/
/*eslint no-unused-vars: "warn"*/
const fs = require('fs')
// 扫描白名单,在此名单下的将不会被添加
const whiteList = ['BaseController.js']
// 扫描指定文件夹下的控制器并将它添加到路由中
function addMapping(router, mapping) {
	for (var url in mapping) {
		var path = null
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
function merge(source, target) {
	const and = [...source, ...target]
	const output = []
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
function eliminate(source, target) {
	for (let i = 0; i < target.length; i++) {
		const it = target[i]
		for (let t = 0; t < source.length; t++) {
			const st = source[t]
			if (st == it) {
				source[t] = null
			}
		}
	}
	return source.filter(function (s) {
		return s && (s + '').trim()
	})
}

function addControllers(router, dir) {
	var files = fs.readdirSync(__dirname + '/src/' + dir)
	var js_files = files.filter((f) => {
		return f.endsWith('.js')
	})

	js_files = eliminate(js_files, whiteList)

	for (var f of js_files) {
		console.log(`添加控制器: ${f}...`)
		const mapping = require(__dirname + '/src/' + dir + '/' + f)
		addMapping(router, mapping)
	}
}

// 导出动态挂载控制器函数
module.exports = function (dir) {
	// 如果不传参数，扫描目录默认为'controllers'
	const controllers_dir = dir || 'controllers'
	const router = require('koa-router')()
	addControllers(router, controllers_dir)
	return router.routes()
}
