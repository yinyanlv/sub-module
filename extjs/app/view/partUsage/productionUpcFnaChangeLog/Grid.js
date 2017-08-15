Ext.define('App.view.partUsage.productionUpcFnaChangeLog.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.productionupcfnachangeloggrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partUsage.ProductionUpcFnaChangeLog',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/pupcfna-change-log/export'
	}],
	columns: [{
		text: '配件编码',
		dataIndex: 'partCode',
		width: 100
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		width: 140
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		width: 140
	}, {
		text: '修改前FNA',
		dataIndex: 'oldUpcfnaCode',
		width: 120
	}, {
		text: '修改前功能地址中文描述',
		dataIndex: 'oldUpcfnaNoteZh',
		width: 160
	}, {
		text: '修改前功能地址英文描述',
		dataIndex: 'oldUpcfnaNoteEn',
		width: 160
	}, {
		text: '修改后FNA',
		dataIndex: 'newUpcfnaCode',
		width: 120
	}, {
		text: '修改后功能地址中文描述',
		dataIndex: 'newUpcfnaNoteZh',
		width: 160
	}, {
		text: '修改后功能地址英文描述',
		dataIndex: 'newUpcfnaNoteEn',
		width: 160
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