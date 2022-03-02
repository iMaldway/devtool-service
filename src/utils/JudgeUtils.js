/**
 * 字符属性操作工具类
 * */
function Utils() {
	const $this = this
	// 是否是空白
	this.isBlank = function(str) {
		return str == null || /^\s*$/.test(str)
	}
	// 是否不是空白
	this.isNotBlank = function(str) {
		return !$this.isBlank(str)
	}
	// 是否是空字符串
	this.isBlankString = function(str) {
		return str === null || str === undefined || str === ''
	}
	// 是否不是空字符串
	this.isNotBlankString = function(str) {
		return !$this.isBlankString(str)
	}
	//
	this.isExternal = function(path) {
		return /^(https?:|mailto:|tel:)/.test(path)
	}
	// ip格式校验
	this.isIP = function(value) {
		return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
			.test(value)
	}
	// 邮箱格式校验
	this.isMaill = function(value) {
		return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value)
	}
	// 身份证格式校验
	this.isID = function(value) {
		return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d{1}|[X])$/.test(value)
	}
	// 电话格式校验
	this.isPhone = function(value) {
		return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)
	}
	// 密码格式校验
	this.isPassword = function(value) {
		return /^[a-zA-Z]\w{5,17}$/.test(value)
	}
	// 英文格式校验
	this.isEnglish = function(value) {
		return /^[a-zA-Z]+$/.test(value)
	}
	// 字符串首字母大写
	this.firstUpperCase = function(str) {
		return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
			return $1.toUpperCase() + $2.toLowerCase()
		})
	}
	// 获取身份证生日
	this.getBirthdayFromIdCard = function(idCard) {
		let birthday = ''
		if (idCard !== null && idCard !== '') {
			if (idCard.length === 15) {
				birthday = '19' + idCard.substr(6, 6)
			} else if (idCard.length === 18) {
				birthday = idCard.substr(6, 8)
			}
			birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
		}
		return birthday
	}
	this.transformIdentityCard = function(value) {
		// sex 0未知  1男  2女
		let sex = 0
		let birthday = ''
		if (value.length === 15) {
			birthday = `19${value.substr(6, 2)}-${value.substr(8, 2)}-${value.substr(10, 2)}`
			sex = (value.substr(14, 1) % 2) || 2
		}
		if (value.length === 18) {
			birthday = `${value.substr(6, 4)}-${value.substr(10, 2)}-${value.substr(12, 2)}`
			sex = (value.substr(16, 1) % 2) || 2
		}
		console.log(birthday)
		return sex
	}
}

const JudgeUtils = new Utils()

module.exports = JudgeUtils
