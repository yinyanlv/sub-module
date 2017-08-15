Ext.define('App.view.legendCatalog.legendTaskStatusReport.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.legendtaskstatusreportgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/9012/export'
	}],
	columns: []
});