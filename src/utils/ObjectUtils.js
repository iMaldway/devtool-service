/**
 * 对象操作工具类
 * */
function Utils() {
	/**
   * @param {object} obj
   * @returns {Boolean}
   */
	this.isObject = function(obj) {
		return obj && (typeof obj == 'object')
	}
	/**
   * @param {object} obj
   * @returns {Boolean}
   */
	this.isNotObject = function(obj) {
		return !this.isObject(obj)
	}

	this.isArrayFn = function (value) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(value)
		} else {
			return Object.prototype.toString.call(value) === '[object Array]'
		}
	}
	/** 不追溯原型链复制
   * @param {object} source  源对象
   * @param {object} target  目标对象
   */
	this.reflection = function(source, target) {
		// 如果不是对象将抛出异常
		if (this.isNotObject(source) || this.isNotObject(target)) {
			throw new Error('There are parameters that are not objects in the given parameters.')
		}
		const arrSource = Object.keys(source)
		for (let i = 0; i < arrSource.length; i++) {
			const key = arrSource[i]
			// 不追溯原型链
			if (target.hasOwnProperty(key)) {
				target[key] = source[key]
			}
		}
	}
	/** 深复制
   * @param {object} source 源对象
   * @param {object} target 目标对象
   */
	this.copy = function(source, target) {
		// 如果不是对象将抛出异常
		if (this.isNotObject(source) || this.isNotObject(target)) {
			throw new Error('There are parameters that are not objects in the given parameters.')
		}
		const arrSource = Object.keys(source)
		for (let i = 0; i < arrSource.length; i++) {
			const key = arrSource[i]
			target[key] = source[key]
		}
	}
	/**
   * 切面
   * 重构目标函数，提供函数执行之前执行之后的钩子函数
   * @param {object} source 目标对象
   * @param {string} attribute 目标函数，属于目标对象的需要代理的属性，必须是函数，否则将抛出异常
   * @param {function} before 目标函数执行之前执行，接收一个参数args(目标函数中arguments转变的数组)，可改变目标函数的参数值
   * @param {function} after 目标函数执行之后执行，接收一个参数args(目标函数中arguments转变的数组)，可改变目标函数的参数值
   */
	this.aspect = function(source, attribute, before, after) {
		if (typeof source[attribute] === 'function') {
			const temporary = source[attribute]
			source[attribute] = function() {
				const parameter = Array.prototype.slice.call(arguments)
				if (typeof before != 'undefined' && before instanceof Function) {
					before.call(source, parameter)
				}
				temporary.apply(source, parameter)
				if (typeof after != 'undefined' && after instanceof Function) {
					after.call(source, parameter)
				}
			}
		} else {
			throw new Error('The property is not an executable function type.')
		}
	}
}

const ObjectUtils = new Utils()

module.exports = ObjectUtils
