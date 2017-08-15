Ext.define('App.view.syncEngineering.devPartTraceTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.devparttracetaskquery',
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
			name: 'newSteCode',
			withAll: true,
			value: App.globalConfig.userCode,
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'basecombo',
			fieldLabel: '初始车系',
			name: 'initialSeriesCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/series/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '任务状态',
			name: 'taskStatusCode',
			withAll: true,
			value: 0,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'PLM配件类型',
			name: 'plmPartTypeCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/plm-part-type/list'
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