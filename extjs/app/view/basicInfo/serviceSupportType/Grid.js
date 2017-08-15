Ext.define('App.view.basicInfo.serviceSupportType.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.servicesupporttypegrid',
	store: 'App.store.basicInfo.ServiceSupportType',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	controlButtons: [],
	tbar: [{
		text: '导出',
		tooltip: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/service-support-type/export'
	}],
	columns: [{
		text: '维修支持类型编码',
		dataIndex: 'code',
		width: 120
	}, {
		text: '维修支持类型名称',
		dataIndex: 'name',
		width: 120
	}]
});