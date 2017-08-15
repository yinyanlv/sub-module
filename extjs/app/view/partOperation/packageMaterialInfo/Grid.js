Ext.define('App.view.partOperation.packageMaterialInfo.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.packagematerialinfogrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partOperation.PackageMaterialInfo',
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
		singleSelectEnable: false,
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导入',
		action: 'import',
		iconCls: 'iconfont icon-import',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/package-material/export'
	}],
	columns: [{
		text: '包装材料编码',
		dataIndex: 'code',
		width: 140
	}, {
		text: '包装材料描述',
		dataIndex: 'description',
		width: 160
	}, {
		text: '包装材料类型',
		dataIndex: 'type',
		width: 100
	}, {
		text: '长',
		dataIndex: 'length',
		width: 80
	}, {
		text: '宽',
		dataIndex: 'width',
		width: 80
	}, {
		text: '高',
		dataIndex: 'height',
		width: 80
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