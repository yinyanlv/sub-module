
<%
	String pageCode = (String) request.getAttribute("pageCode");
%>

<!-- extjs page config -->
<script type="text/javascript">
    var App = App || {};

    App.extjsConfig = {
			pageCode : "${pageCode}",
			pages : {

				// 登录
				"login" : {
					controller : "account.Login",
					viewport : "account.login.Viewport"
				},

				// 主框架
				"master" : {
					controller : "master.Master",
					viewport : "master.Viewport"
				},

				// 首页
				"home" : {
					controller : "master.Home",
					viewport : "master.Home"
				},
				
				// 电咏件编辑
				"electrophoresis-edit" : {
					controller : "partEngineering.ElectrophoresisEdit",
					viewport : "partEngineering.electrophoresisEdit.Viewport"
				},

				// 产品数据同步发布跟踪
				"301":{
					controller : "syncEngineering.DevPartTraceTask",
					viewport : "syncEngineering.devPartTraceTask.Viewport"	
				},

				// 替换管理
				"401":{
					controller : "partEngineering.Supersession",
					viewport : "partEngineering.supersession.Viewport"	
				},

				// 配件管理
				"402":{
					controller : "partEngineering.Parts",
					viewport : "partEngineering.parts.Viewport"	
				},

				// 配件详细
				"parts-detail" : {
					controller : "partEngineering.PartsDetail",
					viewport : "partEngineering.partsDetail.Viewport"
				},

				// 维修策略变更管理
				"403":{
					controller : "partEngineering.ServicePolicyChange",
					viewport : "partEngineering.servicePolicyChange.Viewport"	
				},

				// 维修包管理
				"404":{
					controller : "partEngineering.ServiceKit",
					viewport : "partEngineering.serviceKit.Viewport"	
				},

				// 维修包详细
				"service-kit-detail" : {
					controller : "partEngineering.ServiceKitDetail",
					viewport : "partEngineering.serviceKitDetail.Viewport"
				},

				// 电泳底漆件管理
				"405":{
					controller : "partEngineering.Electrophoresis",
					viewport : "partEngineering.electrophoresis.Viewport"	
				},

				// 售后件生产件对应关系
				"406":{
					controller : "partEngineering.AftersalesProductionPartMapping",
					viewport : "partEngineering.aftersalesProductionPartMapping.Viewport"	
				},

				// 配件照片管理 
				"407":{
					controller : "partEngineering.PartPhoto",
					viewport : "partEngineering.partPhoto.Viewport"	
				},

				// 新件任务
				"408":{
					controller : "partEngineering.NewPartTask",
					viewport : "partEngineering.newPartTask.Viewport"
				},

				// 新件任务详细
				"new-part-task-detail" : {
					controller : "partEngineering.NewPartTaskDetail",
					viewport : "partEngineering.newPartTaskDetail.Viewport"
				},

				// 旧件任务
				"409":{
					controller : "partEngineering.OldPartTask",
					viewport : "partEngineering.oldPartTask.Viewport" 
				},

				// 旧件任务详细
				"old-part-task-detail" : {
					controller : "partEngineering.OldPartTaskDetail",
					viewport : "partEngineering.oldPartTaskDetail.Viewport"
				},

				// ECO信息
				"410":{
					controller : "partEngineering.ECO",
					viewport : "partEngineering.eco.Viewport"
				},

				// ECO详细
				"eco-detail" : {
					controller : "partEngineering.ECODetail",
					viewport : "partEngineering.ecoDetail.Viewport"
				},

				// 维修信息判断查询
				"411":{
					controller : "partEngineering.ServiceInfoPendingQuery",
					viewport : "partEngineering.serviceInfoPendingQuery.Viewport"	
				},

				// 结构确认任务
				"412":{
					controller : "partEngineering.StructConfirmTask",
					viewport : "partEngineering.structConfirmTask.Viewport"	
				},

				// 新增配件结构维护任务
				"413":{
					controller : "partEngineering.AppendPartStructTask",
					viewport : "partEngineering.appendPartStructTask.Viewport"	
				},

				// 用法关闭任务
				"414":{
					controller : "partEngineering.UsageCloseTask",
					viewport : "partEngineering.usageCloseTask.Viewport"	
				},

				// ACT结构维护
				"415":{
					controller : "partEngineering.ActStruct",
					viewport : "partEngineering.actStruct.Viewport"	
				},

				// 配件所属结构查询
				"416":{
					controller : "partEngineering.PartStructQuery",
					viewport : "partEngineering.partStructQuery.Viewport"	
				},

				// 重复用法任务
				"501":{
					controller : "partUsage.RepeatUsageTask",
					viewport : "partUsage.repeatUsageTask.Viewport"	
				},

				// 用法生成
				"502":{
					controller : "partUsage.UsageGenerate",
					viewport : "partUsage.usageGenerate.Viewport"	
				},

				// 图例任务分配
				"601":{
					controller : "legendCatalog.LegendTaskAssign",
					viewport : "legendCatalog.legendTaskAssign.Viewport"	
				},

				// 图例用法
				"602":{
					controller : "legendCatalog.LegendUsage",
					viewport : "legendCatalog.legendUsage.Viewport"	
				},

				// 图例热点用法管理
				"603":{
					controller : "legendCatalog.LegendHotpointUsage",
					viewport : "legendCatalog.legendHotpointUsage.Viewport"	
				},

				// 一级总成件-图例分组
				"604":{
					controller : "legendCatalog.AssemblyLegendGroup",
					viewport : "legendCatalog.assemblyLegendGroup.Viewport"	
				},

				// 图例任务详细
				"605":{
					controller : "legendCatalog.LegendTaskDetail",
					viewport : "legendCatalog.legendTaskDetail.Viewport"	
				},

				// 图例-配件关系详细
				"606":{
					controller : "legendCatalog.LegendPartRelation",
					viewport : "legendCatalog.legendPartRelation.Viewport"	
				},

				// 图例目录清单预览
				"607":{
					controller : "legendCatalog.LegendCatalogList",
					viewport : "legendCatalog.legendCatalogList.Viewport"	
				},

				// 未配图任务报告
				"608":{
					controller : "legendCatalog.UnfinishedTaskReport",
					viewport : "legendCatalog.unfinishedTaskReport.Viewport"	
				},

				// 序号不匹配任务报告
				"609":{
					controller : "legendCatalog.CalloutMismatchTaskReport",
					viewport : "legendCatalog.calloutMismatchTaskReport.Viewport"	
				},

				// 重复配图任务报告
				"610":{
					controller : "legendCatalog.RepeatLegendQuery",
					viewport : "legendCatalog.repeatLegendQuery.Viewport"	
				},

				// 序号缺少用法任务报告
				"611":{
					controller : "legendCatalog.CalloutLackUsageTaskReport",
					viewport : "legendCatalog.calloutLackUsageTaskReport.Viewport"	
				},

				// 图例任务状态统计
				"612":{
					controller : "legendCatalog.LegendTaskStatusReport",
					viewport : "legendCatalog.legendTaskStatusReport.Viewport"	
				},

				// 配件采购信息维护
				"801":{
					controller : "partOperation.PartPurchaseInfo",
					viewport : "partOperation.partPurchaseInfo.Viewport"	
				},

				// 配件包装信息维护
				"802":{
					controller : "partOperation.PartPackageInfo",
					viewport : "partOperation.partPackageInfo.Viewport"	
				},

				// 包装材料信息管理
				"803":{
					controller : "partOperation.PackageMaterialInfo",
					viewport : "partOperation.packageMaterialInfo.Viewport"	
				},

				// 包装规范信息管理
				"804":{
					controller : "partOperation.PackageStandardInfo",
					viewport : "partOperation.packageStandardInfo.Viewport"	
				},

				// 新增采购需求任务单
				"901":{
					controller : "releaseControl.AppendPurchaseRequireTask",
					viewport : "releaseControl.appendPurchaseRequireTask.Viewport"	
				},

				// 停止采购需求任务单
				"902":{
					controller : "releaseControl.EndPurchaseRequireTask",
					viewport : "releaseControl.endPurchaseRequireTask.Viewport"	
				},

				// 产品售后FNA关系维护
				"1001":{
					controller : "basicInfo.FnaRelationship",
					viewport : "basicInfo.fnaRelationship.Viewport"	
				},

				// 图例分组
				"1002":{
					controller : "basicInfo.LegendGroup",
					viewport : "basicInfo.legendGroup.Viewport"	
				},

				// 图例标准名称
				"1003":{
					controller : "basicInfo.LegendStandardName",
					viewport : "basicInfo.legendStandardName.Viewport"	
				},

				// 图例信息
				"1004":{
					controller : "basicInfo.LegendInfo",
					viewport : "basicInfo.legendInfo.Viewport"	
				},

				// 维修件类型
				"1005":{
					controller : "basicInfo.ServicePartType",
					viewport : "basicInfo.servicePartType.Viewport"	
				},

				// 维修支持类型
				"1006":{
					controller : "basicInfo.ServiceSupportType",
					viewport : "basicInfo.serviceSupportType.Viewport"	
				},

				// 维修策略变更理由
				"1007":{
					controller : "basicInfo.ServicePolicyChange",
					viewport : "basicInfo.servicePolicyChange.Viewport"	
				},

				// 配件分类
				"1008":{
					controller : "basicInfo.PartCategory",
					viewport : "basicInfo.partCategory.Viewport"	
				},

				// 海关编码
				"1009":{
					controller : "basicInfo.HSCode",
					viewport : "basicInfo.hsCode.Viewport"	
				},

				// 储备建议类型
				"1010":{
					controller : "basicInfo.ReserveSuggestType",
					viewport : "basicInfo.reserveSuggestType.Viewport"	
				},

				// 替换类型
				"1011":{
					controller : "basicInfo.SupersessionType",
					viewport : "basicInfo.supersessionType.Viewport"	
				},

				// 处理建议
				"1012":{
					controller : "basicInfo.TreatmentProposal",
					viewport : "basicInfo.treatmentProposal.Viewport"	
				},

				// 维修策略
				"1013":{
					controller : "basicInfo.ServicePolicy",
					viewport : "basicInfo.servicePolicy.Viewport"	
				},

				// 用法状态
				"1014":{
					controller : "basicInfo.UsageStatus",
					viewport : "basicInfo.usageStatus.Viewport"	
				},

				// 继承结构
				"1015":{
					controller : "basicInfo.InheritanceStructure",
					viewport : "basicInfo.inheritanceStructure.Viewport"	
				},

				// 采购需求
				"1016":{
					controller : "basicInfo.PurchaseControl",
					viewport : "basicInfo.purchaseControl.Viewport"	
				},

				// 采购状态
				"1017":{
					controller : "basicInfo.PurchaseStatus",
					viewport : "basicInfo.purchaseStatus.Viewport"	
				},

				// 销售状态
				"1018":{
					controller : "basicInfo.SalesStatus",
					viewport : "basicInfo.salesStatus.Viewport"	
				},

				// 库存状态
				"1019":{
					controller : "basicInfo.StockStatus",
					viewport : "basicInfo.stockStatus.Viewport"	
				},

				// 定价状态
				"1020":{
					controller : "basicInfo.PricingStatus",
					viewport : "basicInfo.pricingStatus.Viewport"	
				},

				// 包装状态
				"1021":{
					controller : "basicInfo.PackageStatus",
					viewport : "basicInfo.packageStatus.Viewport"	
				},

				// 配件颜色
				"1022":{
					controller : "basicInfo.PartColor",
					viewport : "basicInfo.partColor.Viewport"	
				},

				// 损坏周期
				"1023":{
					controller : "basicInfo.DamageCycle",
					viewport : "basicInfo.damageCycle.Viewport"	
				},

				// 设计阶段
				"1024":{
					controller : "basicInfo.DesignStage",
					viewport : "basicInfo.designStage.Viewport"	
				},

				// 供应商管理
				"1025":{
					controller : "basicInfo.SupplierManagement",
					viewport : "basicInfo.supplierManagement.Viewport"	
				},

				// 维修信息判断类型
				"1026":{
					controller : "basicInfo.ServicePaddingType",
					viewport : "basicInfo.servicePaddingType.Viewport"	
				},

				// 品牌
				"1027":{
					controller : "basicInfo.Brand",
					viewport : "basicInfo.brand.Viewport"	
				},

				// 车系
				"1028":{
					controller : "basicInfo.Series",
					viewport : "basicInfo.series.Viewport"	
				},

				// 车型
				"1029":{
					controller : "basicInfo.Model",
					viewport : "basicInfo.model.Viewport"	
				},

				// 产品FNA
				"1030":{
					controller : "basicInfo.ProductionUpcFna",
					viewport : "basicInfo.productionUpcFna.Viewport"	
				},

				// 售后FNA
				"1031":{
					controller : "basicInfo.SalesUpcFna",
					viewport : "basicInfo.salesUpcFna.Viewport"	
				},

				// 配置总表
				"1032":{
					controller : "basicInfo.RPO",
					viewport : "basicInfo.rpo.Viewport"	
				},

				// 车身颜色
				"1033":{
					controller : "basicInfo.PartColor",
					viewport : "basicInfo.partColor.Viewport"	
				},

				// SMT
				"1034":{
					controller : "basicInfo.SMT",
					viewport : "basicInfo.smt.Viewport"	
				},

				// 任务规则管理
				"1101":{
					controller : "generalSettings.TaskRuleManagement",
					viewport : "generalSettings.taskRuleManagement.Viewport"	
				},

				// 图例任务分配
				"1102":{
					controller : "generalSettings.LegendTaskAssign",
					viewport : "generalSettings.legendTaskAssign.Viewport"	
				},

				// 用户管理
				"1103":{
					controller : "generalSettings.UserManage",
					viewport : "generalSettings.userManage.Viewport"	
				},

				// 角色管理
				"1104":{
					controller : "generalSettings.RoleManage",
					viewport : "generalSettings.roleManage.Viewport"	
				}
			}
	};

    App.pageConfig = App.extjsConfig.pages["${pageCode}"];
</script>
