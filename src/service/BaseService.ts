import Hold from "../expression/Hold";
import BaseServiceInterface from "../interface/BaseServiceInterface";
import Basicservice from "./Basicservice";

export default class BaseService
  extends Basicservice
  implements BaseServiceInterface
{
  public dao: any;

  @Hold("/class")
  public HttpExcetion: any;

  @Hold("/utils")
  public JudgeUtils: any;

  @Hold("/utils")
  public ObjectUtils: any;

  constructor(dao: any) {
    super();
    try {
      if (dao != null) {
        if (typeof dao == "object") {
          this.dao = dao;
        } else {
          const TargetDao = require("../dao/" + dao);
          this.dao = new TargetDao();
          // import('../dao/' + dao).then((dao)=>{
          // 	this.dao = dao
          // })
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async add(parameters: any) {
    // 请求
    const res = await this.dao.add(parameters);
    // 响应
    return res;
  }

  async remove(parameters: any) {
    // 请求
    const res = await this.dao.remove(parameters);
    // 响应
    return res;
  }

  async get(parameters: any) {
    let data = {};
    try {
      // 请求
      const res = await this.dao.query(parameters);
      const resTotal = await this.dao.queryTotal(parameters);
      if (parameters && parameters.id) {
        data = res ? res[0] : {};
      } else {
        console.log(resTotal);
        data["list"] = res;
        data["total"] = resTotal ? resTotal[0].total : 0;
      }
    } catch (error) {
      console.error(error);
    }
    // 响应
    return data;
  }

  async update(parameters: any) {
    // 请求
    const res = await this.dao.update(parameters);
    // 响应
    return res;
  }
}

module.exports = BaseService;
