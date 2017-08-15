Ext.define('App.view.basicInfo.partCategory.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.partcategorygrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.PartCategory',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		iconCls: 'x-fa fa-plus-square-o',
		tooltip: '新增',
		text: '新增',
		action: 'create',
		ui: 'grid-toolbar'
	}, {
		iconCls: 'x-fa fa-edit',
		text: '修改',
		tooltip: '修改',
		action: 'update',
		disabled: true,
		singleSelectEnable: true,
		ui: 'grid-toolbar'
	}, {
		iconCls: 'x-fa fa-trash-o',
		text: '删除',
		tooltip: '删除',
		action: 'destroy',
		disabled: true,
		singleSelectEnable: true,
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/part-classify/export'
	}],
	columns: [{
		text: '配件分类编码',
		dataIndex: 'code',
		width: 120
	}, {
		text: '配件分类名称',
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