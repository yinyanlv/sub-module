Ext.define('App.view.basicInfo.supplierManagement.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.suppliermanagementgrid',
	store: 'App.store.basicInfo.SupplierManagement',
	rownumberer: true,
	multiSelectCheckbox: false,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/supplier/export'
	}],
	columns: [{
		text: '供应商编码',
		dataIndex: 'code',
		width: 140
	}, {
		text: '供应商名称',
		dataIndex: 'name',
		width: 140
	}, {
		text: '联系方式',
		dataIndex: 'tele',
		width: 140
	}, {
		text: '联系人',
		dataIndex: 'contact',
		width: 100
	}]
});