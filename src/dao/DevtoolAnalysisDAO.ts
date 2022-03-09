import BaseDao from './BaseDao'
/**
 * @class
 * @todo tableName为表名。由于Dao继承于BaseDao，所以继承了所有的方法，在BaseDao中需要指定一个操作的表名来进行后续SQL语句操作。
 */
export default class Dao extends BaseDao {

	constructor(tableName:string = 'devtool_analysis') {
		// 先实例化父级
		super(tableName)
	}

}
// 将对象实例化并导出
module.exports = Dao
