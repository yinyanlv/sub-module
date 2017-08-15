Ext.define('App.view.legendCatalog.repeatLegendQuery.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.repeatlegendquerygrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/9010/export'
	}],
	columns: []
});