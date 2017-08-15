Ext.define('App.view.basicInfo.treatmentProposal.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.treatmentproposalgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.TreatmentProposal',
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/treatment-proposal/export'
	}],
	columns: [{
		text: '处理建议编码',
		dataIndex: 'code',
		width: 120
	}, {
		text: '处理建议名称',
		dataIndex: 'name',
		width: 120
	}]
});