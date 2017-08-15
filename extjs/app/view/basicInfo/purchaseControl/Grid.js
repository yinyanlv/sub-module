Ext.define('App.view.basicInfo.purchaseControl.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.purchasecontrolgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	controlButtons: ['update'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/2012/export'
	}],
	columns: []
});