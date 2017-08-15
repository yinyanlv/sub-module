Ext.define('App.view.basicInfo.reserveSuggestType.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.reservesuggesttypegrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.ReserveSuggestType',
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
		text: '储备建议类型编码',
		dataIndex: 'code',
		width: 150
	}, {
		text: '储备建议类型名称',
		dataIndex: 'name',
		width: 150
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