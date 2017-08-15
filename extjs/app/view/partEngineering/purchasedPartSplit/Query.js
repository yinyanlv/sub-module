Ext.define('App.view.partEngineering.purchasedPartSplit.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.purchasedpartsplitquery',
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
			withAll: true,
			value: '',
			displayFormat:'{code}-{name}',
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
			value: '',
			displayFormat: '{code}-{name}',
			url: App.globalConfig.path + '/combo/service-support-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '任务状态',
			name: 'taskStatusCode',
			values: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务创建时间-起',
			name: 'startDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务创建时间-止',
			name: 'startDate_E',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务结束时间-起',
			name: 'endDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务结束时间-止',
			name: 'endDate_E',
			format: 'Y-m-d'
		}]
	}]
});