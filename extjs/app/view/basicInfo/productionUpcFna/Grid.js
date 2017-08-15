Ext.define('App.view.basicInfo.productionUpcFna.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.productionupcfnagrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.ProductionUpcFna',
	tbar: [{
		iconCls: 'x-fa fa-edit',
		text: '修改',
		tooltip: '修改',
		action: 'update',
		disabled: true,
		singleSelectEnable: true,
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/pupcfna/export'
	}],
	columns: [{
		text: '产品FNA',
		dataIndex: 'code',
		width: 100
	}, {
		text: '产品功能名称位置中文描述',
		dataIndex: 'noteZh',
		width: 180
	}, {
		text: '产品功能名称位置英文描述',
		dataIndex: 'noteEn',
		width: 180
	}, {
		text: '售后FNA',
		dataIndex: 'scode',
		width: 100
	}, {
		text: '售后功能名称位置中文描述',
		dataIndex: 'snoteZh',
		width: 180
	}, {
		text: '售后功能名称位置中文描述',
		dataIndex: 'snoteEn',
		width: 180
	}, {
		text: '修改人',
		dataIndex: 'modifiedBy',
		width: 100
	}, {
		text: '修改时间',
		dataIndex: 'modifiedDate',
		width: 100
	}]
});