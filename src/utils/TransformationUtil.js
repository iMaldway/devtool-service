const DatetUtils = require('./DateUtils')
/**
 * 将提交的对象转换成表，深度遍历
 * before:
 * {'tableBase':'测试','httpsTcp':{'nameCf':'my','id':1}}
 * after:
 * {'table_base':'测试','https_tcp':{'name_cf':'my','id':1}}
 *
 * @param obj 接收的对象
 */
const resultToTable = function (obj) {
	let result = ''
	if (typeof obj == 'object') {
		const reform = isArrayFn(obj) ? [] : {}
		for (const key in obj) {
			const value = obj[key]
			const keyList = [...key]
			const reformKey = [...key.toLowerCase()]
			let t = -1
			for (let i = 0; i < keyList.length; i++) {
				const char = keyList[i]
				const charCode = char.charCodeAt()
				// A-Z 对应的 Unicode 编码是 65 - 90
				if (charCode >= 65 && charCode <= 90) {
					t++
					const loChar = char.toLowerCase()
					reformKey[i + t] = loChar
					reformKey.splice(i + t, 0, '_')
				}
			}
			if (typeof value == 'object') {
				reform[reformKey.join('')] = resultToTable(value)
			} else {
				reform[reformKey.join('')] = obj[key]
			}
		}
		result = reform
	} else {
		result = obj
	}
	return result
}

/**
 * 将提交的对象转换成表，深度遍历
 * before:
 * {'table_base':'测试','https_tcp':{'name_cf':'my','id':1}}
 * after:
 * {'tableBase':'测试','httpsTcp':{'nameCf':'my','id':1}}
 *
 * @param obj 接收的对象
 */
const tableToResult = function (obj) {
	let result = ''
	if (typeof obj == 'object') {
		const reform = isArrayFn(obj) ? [] : {}
		for (const key in obj) {

			// 如果是数组 value的值为对象，如果不是数据value为实际值。
			const value = obj[key]
			const keyList = [...key]
			let reformKey = []
			let t = -1
			// 存在_下划线的key转为小写处理
			if (key.indexOf('_') > -1) {
				reformKey = [...key.toLowerCase()]
				for (let i = 0; i < reformKey.length; i++) {
					const char = keyList[i]
					// A-Z 对应的 Unicode 编码是 65 - 90
					if (char == '_') {
						// 删除两位，_x 并且将删除的第二位转大写添加进入数组
						t++
						reformKey.splice(i - t, 2, keyList[i + 1].toUpperCase())
						i++
					}
				}
			} else {
				reformKey = [...key]
			}
			// 判断value的类型进行格式化处理
			if (typeof value == 'object' && value != null) {
				if (value instanceof Date) {
					reform[reformKey.join('')] = DatetUtils.dateFormat('yyyy-MM-dd HH:ss:mm', value)
				} else {
					reform[reformKey.join('')] = tableToResult(value)
				}
			} else {
				reform[reformKey.join('')] = obj[key]
			}
		}
		result = reform
	} else {
		result = obj
	}
	return result
}

const isArrayFn = function (value) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(value)
	} else {
		return Object.prototype.toString.call(value) === '[object Array]'
	}
}

const convert = function (value) {
	const kList = [...value]
	for (let i = 0; i < kList.length;) {
		const char = kList[i]
		// A-Z 对应的 Unicode 编码是 65 - 90
		if (char == '_') {
			// 删除两位，_x 并且将删除的第二位转大写添加进入数组
			kList.splice(i, 2, kList[i + 1].toUpperCase())
			i = i + 2
		} else {
			i++
		}
	}
	return kList.join('')
}

module.exports = {
	resultToTable, tableToResult, isArrayFn, convert
}

