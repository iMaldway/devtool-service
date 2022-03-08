let config = require('../../config/default.js')

let mysql = require('mysql')

/**
 * 初始化连接池
 */
const pool = mysql.createPool({
	host: config.database.host,
	port: config.database.port,
	user: config.database.username,
	password: config.database.password,
	database: config.database.database
})

class Connect {

	/**
	 * 默认采用配置文件中的配置进行初始化
	 *
	 */
	constructor(host = config.database.host, port = config.database.port, username = config.database.username, password = config.database.password, database = config.database.database) {
		this.host = host
		this.user = username
		this.password = password
		this.database = database
		this.port = port
		this.pool = pool
	}

	/**
	 * 可选新建立一个链接
	 */
	initPool(database) {
		this.host = database.host
		this.user = database.username
		this.password = database.password
		this.database = database.database
		this.pool = mysql.createPool({
			host: this.host,
			user: this.user,
			password: this.password,
			database: this.database
		})
	}
	/**
	 *
	 * @param sql 接收的sql语句
	 * @param values 接受的参数： 为数组
	 */
	query(sql, values) {
		return new Promise((resolve, reject) => {
			this.pool.getConnection(function (err, connection) {
				if (err) {
					console.log(err)
					resolve(err)
				} else {
					connection.query(sql, values, (err, rows) => {
						if (err) {
							reject(err)
						} else {
							resolve(rows)
						}
						connection.release()
					})
				}
			})
		})
	}
}

module.exports = Connect
