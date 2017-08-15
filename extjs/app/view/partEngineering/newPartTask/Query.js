Ext.define('App.view.partEngineering.newPartTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.newparttaskquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SMT',
			name: 'smtCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/smt/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '当前STE',
			name: 'steCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'basecombo',
			fieldLabel: '来源',
			name: 'source',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/source/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修策略',
			name: 'servicePolicyCode',
			displayFormat:'{code}-{name}',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修件类型',
			name: 'servicePartTypeCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-part-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修支持类型',
			name: 'serviceSupportTypeCode',
			withAll: true,
			displayFormat: '{code}-{name}',
			value: '',
			url: App.globalConfig.path + '/combo/service-support-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '任务状态',
			name: 'taskStatusCode',
			value: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务创建日期-起',
			name: 'startDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务创建日期-止',
			name: 'startDate_E',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务结束日期-起',
			name: 'endDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务结束日期-止',
			name: 'endDate_E',
			format: 'Y-m-d'
		}]
	}]
});