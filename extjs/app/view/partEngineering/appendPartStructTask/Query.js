Ext.define('App.view.partEngineering.appendPartStructTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.appendpartstructtaskquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			fieldLabel: '维修策略',
			name: 'servicePolicyCode',
			xtype: 'basecombo',
			displayFormat:'{code}-{name}',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			fieldLabel: '维修件类型',
			name: 'servicePartTypeCode',
			xtype: 'basecombo',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-part-type/list'
		}, {
			fieldLabel: '维修支持类型',
			name: 'serviceSupportTypeCode',
			xtype: 'basecombo',
			displayFormat: '{code}-{name}',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-support-type/list'
		}, {
			fieldLabel: '任务状态',
			xtype: 'basecombo',
			name: 'taskStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			fieldLabel: 'SPL',
			name: 'splCode',
			xtype: 'basecombo',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
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