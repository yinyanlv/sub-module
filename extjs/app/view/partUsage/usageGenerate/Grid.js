Ext.define('App.view.partUsage.usageGenerate.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.usagegenerategrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partUsage.UsageGenerate',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		iconCls: 'iconfont icon-edit',
		text: '重新生成',
		action: 're-generate',
		ui: 'grid-toolbar'
	}, {
		iconCls: 'iconfont icon-edit',
		text: '生成记录',
		action: 'view-generate-record',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/usage/export'
	}],
	columns: [{
		text: '配件编码',
		dataIndex: 'partCode',
		width: 120
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		width: 160
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		width: 160
	}, {
		text: '品牌',
		dataIndex: 'brandName',
		width: 80
	}, {
		text: '车系',
		dataIndex: 'seriesName',
		width: 80
	}, {
		text: 'FNA',
		dataIndex: 'supcfnaCode',
		width: 120
	}, {
		text: '一级总成号',
		dataIndex: 'rootPartCode',
		width: 120
	}, {
		text: '是否有多条用法',
		dataIndex: 'hasMultipleUsageName',
		width: 120
	}, {
		text: 'SPL',
		dataIndex: 'splName',
		width: 100
	}, {
		text: '生效时间',
		dataIndex: 'startDate',
		width: 140
	}, {
		text: '失效时间',
		dataIndex: 'endDate',
		width: 140
	}, {
		text: '配置',
		dataIndex: 'rpo',
		width: 120
	}, {
		text: '用量',
		dataIndex: 'qty',
		width: 80
	}, {
		text: '用法备注',
		dataIndex: 'usageNote',
		width: 180
	}, {
		text: '用法状态',
		dataIndex: 'usageStatusName',
		width: 100
	}]
});