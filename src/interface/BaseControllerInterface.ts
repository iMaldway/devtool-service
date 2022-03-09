import BaseServiceInterface from '../interface/BaseServiceInterface'

export default interface BaseControllerInterface {
    /** *
     * @todo Dao
     */
     service:BaseServiceInterface;

     /** *
       * @todo 向指定表格添加一条数据
       * @param {Object} val 参数对象
       * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
       */
      _add(ctx:any, next:any):any;
      /** *
       * @todo 向指定表格删除一条数据
       * @param {Object} val 参数对象
       * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
       */
       _remove(ctx:any, next:any):any;
      /** *
       * @todo 向指定表格查询数据，如果包含ID字段则按照该ID查询匹配的一条数据
       * @param {Object} val 参数对象
       * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
       */
       _get(ctx:any, next:any):any;
      /** *
       * @todo 向指定表格修改一条数据,必须包含ID数据作为索引查询
       * @param {Object} val 参数对象
       * @returns {Object} 返回一个Promise对象，可能是抛出错误信息。
       */
       _update(ctx:any, next:any):any;
}