Ext.define('App.view.basicInfo.stockStatus.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.stockstatusgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/2015/export'
	}],
	columns: []
});