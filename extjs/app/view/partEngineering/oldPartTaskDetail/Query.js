Ext.define('App.view.partEngineering.oldPartTaskDetail.Query', {
	extend: 'Ext.form.Panel',
	alias: 'widget.oldparttaskdetailquery',
	bodyPadding: '5 10 0 10',
	layout: 'column',
	defaults: {
		margin: '0 10 0 0'
	},
	items: [{
		xtype: 'basecombo',
		fieldLabel: '维修策略',
		name: 'servicePolicyCode',
		withAll: true,
		displayFormat:'{code}-{name}',
		value: '',
		url: App.globalConfig.path + '/combo/service-policy/list'
	}, {
		xtype: 'basecombo',
		fieldLabel: '任务状态',
		name: 'status',
		withAll: true,
		value: 0,
		url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		border: true,
		layout: {
			align: 'middle',
			pack: 'center',
			type: 'hbox'
		},
		height: 'auto',
		style: 'padding-bottom: 5px;padding-top: 5px;',
		defaults: {
			width: 80
		},
		items: [{
			xtype: 'button',
			itemId: "query",
			text: "查询"
		}, {
			xtype: 'button',
			itemId: "reset",
			text: "重置"
		}]
	}]
});