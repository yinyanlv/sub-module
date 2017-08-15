Ext.define('App.view.partEngineering.newPartTaskDetail.Query', {
	extend: 'Ext.form.Panel',
	alias: 'widget.newparttaskdetailquery',
	bodyPadding: '5 10 0 10',
	layout: 'column',
	defaults: {
		margin: '0 10 0 0'
	},
	items: [{
		xtype: 'basecombo',
		fieldLabel: '维修件类型',
		name: 'servicePartTypeCode',
		withAll: true,
		value: '',
		url: App.globalConfig.path + '/combo/service-part-type/list'
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