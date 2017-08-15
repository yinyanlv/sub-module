Ext.define('App.view.partUsage.repeatUsageTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.repeatusagetaskquery',
	items: [{
		items: [{
			fieldLabel: '父配件编码',
			name: 'parentPartCode'
		}, {
			fieldLabel: '父配件名称',
			name: 'parentPartName'
		}, {
			fieldLabel: 'SPL',
			xtype: 'basecombo',
			name: 'splCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
		}, {
			fieldLabel: '任务状态',
			xtype: 'basecombo',
			name: 'taskStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
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