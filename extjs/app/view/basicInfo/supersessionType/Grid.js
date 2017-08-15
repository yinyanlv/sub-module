Ext.define('App.view.basicInfo.supersessionType.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.supersessiontypegrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.SupersessionType',
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/supersession-type/export'
	}],
	columns: [{
		text: '替换类型编码',
		dataIndex: 'code',
		width: 120
	}, {
		text: '替换类型名称',
		dataIndex: 'name',
		width: 120
	}, {
		text: '创建人',
		dataIndex: 'createdBy',
		width: 120
	}, {
		text: '创建时间',
		dataIndex: 'createdDate',
		width: 140
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