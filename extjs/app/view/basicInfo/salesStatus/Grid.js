Ext.define('App.view.basicInfo.salesStatus.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.salesstatusgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	controlButtons: ['update'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/2014/export'
	}],
	columns: []
});