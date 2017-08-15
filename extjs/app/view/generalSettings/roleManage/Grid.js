Ext.define('App.view.generalSettings.roleManage.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.rolegrid',
	store: 'App.store.generalSettings.RoleManage',
	multiSelectCheckbox: false,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/user-type/export'
	}],
	columns: [{
		text: '用户类型编码',
		dataIndex: 'code',
		width: 120
	}, {
		text: '用户类型名称',
		dataIndex: 'name',
		width: 140
	}, {
		text: '用户类型备注',
		dataIndex: 'note',
		width: 160
	}]
});