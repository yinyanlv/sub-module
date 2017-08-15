Ext.define('App.view.legendCatalog.calloutMismatchTaskReport.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.calloutmismatchtaskreportgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/9009/export'
	}],
	columns: []
});