Ext.define('App.view.basicInfo.fnaRelationship.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.fnarelationshipquery',
	items: [{
		items: [{
			fieldLabel: '产品FNA',
			name: 'code'
		}, {
			fieldLabel: '产品位置描述',
			name: 'note'
		}, {
			fieldLabel: '售后FNA',
			name: 'scode'
		}, {
			fieldLabel: '售后位置描述',
			name: 'snote'
		}, {
			xtype: 'basecombo',
			fieldLabel: '任务状态',
			name: 'taskStatusCode',
			value: '0',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务创建日期-起',
			name: 'createdDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务创建日期-止',
			name: 'createdDate_E',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务结束日期-起',
			name: 'taskFinishDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '任务结束日期-止',
			name: 'taskFinishDate_E',
			format: 'Y-m-d'
		}]
	}]
});