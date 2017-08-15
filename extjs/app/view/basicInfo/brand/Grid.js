Ext.define('App.view.basicInfo.brand.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.brandgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.Brand',
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
	}],
	columns: [{
		text: '品牌编码',
		dataIndex: 'code',
		width: 100
	}, {
		text: '品牌名称',
		dataIndex: 'name',
		width: 100
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