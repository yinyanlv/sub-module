Ext.define('App.view.legendCatalog.calloutLackUsageTaskReport.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.calloutlackusagetaskreportgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/9011/export'
	}],
	columns: []
});