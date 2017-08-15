Ext.define('App.view.basicInfo.designStage.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.designstagegrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		ui: 'grid-toolbar',
		iconCls: 'iconfont icon-export',
		exportUrl: App.globalConfig.path + '/report/2020/export'
	}],
	columns: []
});