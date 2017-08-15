Ext.define('App.view.generalSettings.userManage.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.usergrid',
	store: 'App.store.generalSettings.UserManage',
	fastOpenEditDialog: true,
	multiSelectCheckbox: true,
	controlButtons: ['update'],
	tbar: [{
		xtype: 'button',
		text: '修改',
		action: 'update',
		disabled: true,
		singleSelectEnable: true,
		iconCls: 'x-fa fa-edit',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/user/export'
	}],
	columns: [{
		text: '用户编码',
		dataIndex: 'code',
		width: 120
	}, {
		text: '用户名称',
		dataIndex: 'name',
		width: 120
	}, {
		text: '用户类型',
		dataIndex: 'typeNames',
		width: 180,
		sortable: false
	}, {
		text: '修改人',
		dataIndex: 'modifiedBy',
		width: 120
	}, {
		text: '修改时间',
		dataIndex: 'modifiedDate',
		width: 140
	}]
});