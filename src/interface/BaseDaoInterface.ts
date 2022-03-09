export default interface BaseDaoInterface{

    /** *
     * @todo 表名
     */
    tableName:string;

    /** *
     * @todo 向指定表格添加一条数据
     * @param {Object} val 参数对象
     * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
     */
    add(val:any):any;
    /** *
     * @todo 向指定表格删除一条数据
     * @param {Object} val 参数对象
     * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
     */
    remove(val:any):any;
    /** *
     * @todo 向指定表格查询数据，如果包含ID字段则按照该ID查询匹配的一条数据
     * @param {Object} val 参数对象
     * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
     */
    query(val:any):any;
    /** *
     * @todo 查询上次检索之后总行数
     * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
     */
    queryTotal():any;
    /** *
     * @todo 向指定表格修改一条数据,必须包含ID数据作为索引查询
     * @param {Object} val 参数对象
     * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
     */
    update(val:any):any;
}