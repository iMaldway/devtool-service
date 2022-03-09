const BaseService = require('./BaseService')

const DevtoolDatabaseDAO = require('../dao/DevtoolDatabaseDAO')
const DevtoolTemplateDAO = require('../dao/DevtoolTemplateDAO')
const DevtoolTemplateFileDAO = require('../dao/DevtoolTemplateFileDAO')
const DevtoolGeneratorConfigDAO = require('../dao/DevtoolGeneratorConfigDAO')
const DevtoolAnalysisDAO = require('../dao/DevtoolAnalysisDAO')

const GenerateAPIService = require('../service/GenerateAPIService')

const { tableToResult } = require('../utils/TransformationUtil')

const ejs = require('ejs')

export default class Service extends BaseService {

	public DevtoolDatabaseDAO = new DevtoolDatabaseDAO();
	public DevtoolTemplateDAO = new DevtoolTemplateDAO();
	public DevtoolTemplateFileDAO = new DevtoolTemplateFileDAO();
	public DevtoolAnalysisDAO = new DevtoolAnalysisDAO();
	public DevtoolGeneratorConfigDAO = new DevtoolGeneratorConfigDAO();
	public GenerateAPIService = new GenerateAPIService();

	constructor() {
		// 先实例化父级
		super()
	}

	async build(parameters) {
		const res = {}
		const templateData = await this.getTemplateData(parameters)
		const templateFileInfo = await this.getTemplateInfo(parameters.templateName)
		try {
			for (const i in templateFileInfo) {
				const itme = templateFileInfo[i]
				const src = ejs.render(itme.body, templateData)
				res[templateData.className + itme.name] = src
			}
		} catch (error) {
			console.error(error)
			throw new this.HttpExcetion('渲染失败', 400)
		}
		return res
	}

	/**
    * @todo 获取模板数据。
    * @param {*} parameters
    */
	async getTemplateInfo(templateName:string) {
		// 获取模板信息
		const templateInfo = await this.DevtoolTemplateDAO.query({
			name: templateName
		})
		this.notNull(templateInfo, '没有相关的模板信息')
		// 获取模板文件信息
		const templateFileInfo = await this.DevtoolTemplateFileDAO.query({
			templateId: templateInfo[0].id,
			pageNumber: 1,
			pageSize: 999
		})
		this.notNull(templateFileInfo, '没有相关的模板文件信息')
		return templateFileInfo
	}

	/**
    * @todo 获取模板渲染数据。
    * @param {*} parameters
    */
	async getTemplateData(parameters) {
		// 获取必要数据
		// 获取表格信息
		let tableInfo = await this.DevtoolDatabaseDAO.getTableInfo({
			host: parameters.host,
			port: parameters.port,
			username: parameters.username,
			password: parameters.password,
			database: parameters.database,
			tableName: parameters.tableName
		})
		this.notNull(tableInfo, '没有相关的表格信息')
		tableInfo = tableToResult(tableInfo)
		tableInfo.forEach(itme => {
			itme.columnName = this.convert(itme.columnName)
		})
		// 获取配置信息
		let generatorConfigInfo = await this.DevtoolGeneratorConfigDAO.query({
			name: parameters.generatorConfigName
		})
		this.notNull(generatorConfigInfo, '没有相关的配置信息')
		generatorConfigInfo = tableToResult(generatorConfigInfo[0])

		// 模板数据源
		// if(generatorConfigInfo.tablePrefix){

		// }

		// 类名,没有表前缀信息的
		const className = this.convert(parameters.tableName.replace(generatorConfigInfo.tablePrefix, ''))
		// 类名(小写)
		const classname = className.toLowerCase()
		// 服务名称，等同于类名称变种
		const serviceName = parameters.tableName.replace('_', '\\/')
		// 服务名称（小写）
		const servicename = serviceName.toLowerCase()
		// 表名
		const tableName = parameters.tableName
		// 表名(小写)
		const tablename = tableName.toLowerCase()
		// 主键
		let primaryKey = tableInfo.find(itme => {
			return itme.columnKey && itme.columnKey != '' && itme.columnKey == 'PRI'
		})
		primaryKey = primaryKey ? primaryKey.columnName : ''

		const templateData = { tableInfo, generatorConfigInfo, className, classname, serviceName, servicename, tableName, tablename, primaryKey }
		return templateData
	}

	/**
    * @todo 根据分析配置与模板生成代码。
    * @param {*} parameters
    */
	async buildByAnalysis({templateName, analysisId}) {
		// 获取模板信息
		const templateFileInfo = await this.getTemplateInfo(templateName)
		// 获取分析配置
		const analysisInfo = await this.DevtoolAnalysisDAO.query({
			id: analysisId
		})
		this.notNull(analysisInfo, '没有相关的分析配置信息')
		// 分析目标网页
		const analysisData = await this.GenerateAPIService.getAnalysisOutPut(analysisInfo[0].url,analysisInfo[0].body)
		// 渲染
		const res = {}
		try {
			for (const i in templateFileInfo) {
				const itme = templateFileInfo[i]
				const src = ejs.render(itme.body, {analysisData,'analysisInfo':analysisInfo[0]})
				res[itme.name] = src
			}
		} catch (error) {
			console.error(error)
			throw new this.HttpExcetion('渲染失败，请检查变量是否使用正确', 400)
		}
		return res
	}

}
module.exports = Service
