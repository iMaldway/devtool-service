/**
 * 时间对象工具类
 * */
function Utils() {
	/**
   * 判断闰年
   * @param {object} date
   * @returns {Boolean}
   */
	this.isLeapYear = function(date) {
		return (date.getYear() % 4 == 0 && ((date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)))
	}
	/**
   * 日期格式化
   * @param {String} fmt
   * @param {Object} date
   * @returns {String}
   */
	this.dateFormat = function(fmt, date) {
		if (!date) {
			date = new Date()
		}
		if ((typeof date) == 'string') {
			// 兼容其他浏览器
			date = date.replace(/-/g, '/')
			date = new Date(date)
		}
		var str = fmt
		var Week = ['日', '一', '二', '三', '四', '五', '六']
		str = str.replace(/yyyy|YYYY/, date.getFullYear())
		str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() %
      100))
		str = str.replace(/MM/, date.getMonth() + 1 > 9 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1))
		str = str.replace(/M/g, date.getMonth() + 1)
		str = str.replace(/w|W/g, Week[date.getDay()])
		str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate())
		str = str.replace(/d|D/g, date.getDate())
		str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours())
		str = str.replace(/h|H/g, date.getHours())
		str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes())
		str = str.replace(/m/g, date.getMinutes())
		str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds())
		str = str.replace(/s|S/g, date.getSeconds())
		return str
	}

	/**
   * 求两个时间的天数差 日期格式为 YYYY-MM-dd
   * @param {String} DateOne
   * @param {String} DateTwo
   * @returns {Number}
   */
	this.daysBetween = function(DateOne, DateTwo) {
		var OneMonth = DateOne.substring(5, DateOne.lastIndexOf('-'))
		var OneDay = DateOne.substring(DateOne.length, DateOne.lastIndexOf('-') + 1)
		var OneYear = DateOne.substring(0, DateOne.indexOf('-'))

		var TwoMonth = DateTwo.substring(5, DateTwo.lastIndexOf('-'))
		var TwoDay = DateTwo.substring(DateTwo.length, DateTwo.lastIndexOf('-') + 1)
		var TwoYear = DateTwo.substring(0, DateTwo.indexOf('-'))

		var cha = ((Date.parse(OneMonth + '/' + OneDay + '/' + OneYear) - Date.parse(TwoMonth + '/' + TwoDay + '/' +
      TwoYear)) / 86400000)
		return cha
	}

	/**
   * 求在指定时间段往前或者往后推指定类型的日期数。
   * @param {String} strInterval
   * @param {Number}  Num
   * @param {Object}  date
   * @returns {Object}
   */
	this.dateAdd = function(strInterval, Num, date) {
		var dtTmp = date || new Date()
		switch (strInterval) {
			case 's':
				return new Date(Date.parse(dtTmp) + (1000 * Num))
			case 'n':
				return new Date(Date.parse(dtTmp) + (60000 * Num))
			case 'h':
				return new Date(Date.parse(dtTmp) + (3600000 * Num))
			case 'd':
				return new Date(Date.parse(dtTmp) + (86400000 * Num))
			case 'w':
				return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Num))
			case 'q':
				return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Num * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(),
					dtTmp.getSeconds())
			case 'm':
				return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Num, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(),
					dtTmp.getSeconds())
			case 'y':
				return new Date((dtTmp.getFullYear() + Num), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(),
					dtTmp.getSeconds())
		}
	}

	/**
   * 比较日期差,距离指定日期或者当前日期。
   * dtEnd格式为日期型或者有效日期格式字符串。
   * @param {String} strInterval
   * @param {Object}  dtEnd
   * @param {Object}  date
   * @returns {Number}
   */
	this.dateDiff = function(strInterval, dtEnd, date) {
		var dtStart = date || new Date()
		if (typeof dtEnd == 'string') {
			dtEnd = this.dateFormat(dtEnd)
		}
		switch (strInterval) {
			case 's':
				return parseInt((dtEnd - dtStart) / 1000)
			case 'n':
				return parseInt((dtEnd - dtStart) / 60000)
			case 'h':
				return parseInt((dtEnd - dtStart) / 3600000)
			case 'd':
				return parseInt((dtEnd - dtStart) / 86400000)
			case 'w':
				return parseInt((dtEnd - dtStart) / (86400000 * 7))
			case 'm':
				return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() +
          1)
			case 'y':
				return dtEnd.getFullYear() - dtStart.getFullYear()
		}
	}
	/**
   * 日期输出字符串,showWeek是否显示周几。
   * @param {Boolen} showWeek
   * @param {Obejct} date
   * @returns {String}
   */
	this.toString = function(showWeek, date) {
		var myDate = date || new Date()
		var str = myDate.toLocaleDateString()
		if (showWeek) {
			var Week = ['日', '一', '二', '三', '四', '五', '六']
			str += ' 星期' + Week[myDate.getDay()]
		}
		return str
	}
	/**
   * 日期合法性验证  (格式为：YYYY-MM-DD或YYYY/MM/DD)。
   * @param {String} DateStr
   * @returns {Boolen}
   */
	this.isValidDate = function(DateStr) {
		var sDate = DateStr.replace(/(^\s+|\s+$)/g, '') // 去两边空格;
		if (sDate == '') return true
		//  如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''
		//  数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式
		var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g, '')
		if (s == '') { // 说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D
			var t = new Date(sDate.replace(/\-/g, '/'))
			var ar = sDate.split(/[-/:]/)
			if (ar[0] != t.getYear() || ar[1] != t.getMonth() + 1 || ar[2] != t.getDate()) {
				// alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
				return false
			}
		} else {
			// alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');
			return false
		}
		return true
	}

	/**
   * 日期时间检查 ( 格式为：YYYY-MM-DD HH:MM:SS)。
   * @param {String} DateStr
   * @returns {Boolen}
   */
	this.CheckDateTime = function(str) {
		var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/
		var r = str.match(reg)
		if (r == null) return false
		r[2] = r[2] - 1
		var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6])
		if (d.getFullYear() != r[1]) return false
		if (d.getMonth() != r[2]) return false
		if (d.getDate() != r[3]) return false
		if (d.getHours() != r[4]) return false
		if (d.getMinutes() != r[5]) return false
		if (d.getSeconds() != r[6]) return false
		return true
	}


	/**
   *  把日期分割成数组。
   * @param {Obejct} date
   * @returns {Array}
   */
	this.toArray = function(date) {
		var myDate = date || new Date()
		var myArray = Array()
		myArray[0] = myDate.getFullYear()
		myArray[1] = myDate.getMonth()
		myArray[2] = myDate.getDate()
		myArray[3] = myDate.getHours()
		myArray[4] = myDate.getMinutes()
		myArray[5] = myDate.getSeconds()
		return myArray
	}

	/**
   *  取得日期数据信息。
   * @param {String} interval
   * @param {Obejct} date
   * @returns {String}
   */
	this.datePart = function(interval, date) {
		var myDate = date || new Date()
		var partStr = ''
		var Week = ['日', '一', '二', '三', '四', '五', '六']
		switch (interval) {
			case 'y':
				partStr = myDate.getFullYear()
				break
			case 'm':
				partStr = myDate.getMonth() + 1
				break
			case 'd':
				partStr = myDate.getDate()
				break
			case 'w':
				partStr = Week[myDate.getDay()]
				break
			case 'ww':
				partStr = myDate.WeekNumOfYear()
				break
			case 'h':
				partStr = myDate.getHours()
				break
			case 'n':
				partStr = myDate.getMinutes()
				break
			case 's':
				partStr = myDate.getSeconds()
				break
		}
		return partStr
	}
	/**
   *  取得当前日期所在月的最大天数。
   * @param {Obejct} date
   * @returns {String}
   */
	this.maxDayOfDate = function(date) {
		var myDate = date || new Date()
		var ary = this.toArray(myDate)
		var date1 = (new Date(ary[0], ary[1] + 1, 1))
		var date2 = this.dateAdd('m', 1, date1)
		var result = this.dateDiff(this.dateFormat('yyyy-MM-dd', date1), this.dateFormat('yyyy-MM-dd', date2))
		return result
	}

	/**
   *  获取今天的凌晨
   * @param {String} 'date' or 'string' default 'string'
   * @param {Date}
   * @returns {Object}
   */
	this.getTodayStart = function() {
		const parameter = Array.prototype.slice.call(arguments)
		let type
		let date
		for (let i = 0; i < parameter.length; i++) {
			const itme = parameter[i]
			if ((typeof itme) == 'object') {
				date = itme
			} else if ((typeof itme) == 'string') {
				type = itme
			}
			if (i > 1) {
				break
			}
		}
		var myDate = date || new Date()
		var ary = this.toArray(myDate)
		myDate = new Date(ary[0], ary[1], ary[2], 0, 0, 0)
		if (type && type === 'date') {
			return myDate
		} else {
			return this.dateFormat('yyyy-MM-dd HH:mm:ss', myDate)
		}
	}

	/**
   *  获取今天的午夜
   * @param {String} 'date' or 'string' default 'string'
   * @param {Date}
   * @returns {Object}
   */
	this.getTodayEnd = function() {
		const parameter = Array.prototype.slice.call(arguments)
		let type
		let date
		for (let i = 0; i < parameter.length; i++) {
			const itme = parameter[i]
			if ((typeof itme) == 'object') {
				date = itme
			} else if ((typeof itme) == 'string') {
				type = itme
			}
			if (i > 1) {
				break
			}
		}
		var myDate = date || new Date()
		var ary = this.toArray(myDate)
		myDate = new Date(ary[0], ary[1], ary[2], 23, 59, 59)
		if (type && type === 'date') {
			return myDate
		} else {
			return this.dateFormat('yyyy-MM-dd HH:mm:ss', myDate)
		}
	}

}

const DatetUtils = new Utils()

module.exports = DatetUtils
