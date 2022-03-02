/** *
* @class 通用异常对象对象，继承Error类
*/
class HttpExcetion extends Error {

	constructor(message = '服务器异常', code = 500, errorCode = 10000) {
		super(message)
		this.name = 'HttpExcetion'
		this.message = message
		this.code = code
		this.errorCode = errorCode
	}

}
module.exports = HttpExcetion
