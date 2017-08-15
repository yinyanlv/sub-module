Ext.define('App.view.basicInfo.pricingStatus.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.pricingstatusgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/2016/export'
	}],
	columns: []
});