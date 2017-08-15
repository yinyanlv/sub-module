Ext.define('App.view.partEngineering.usageCloseTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.usageclosetaskgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partEngineering.UsageCloseTask',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/usage-close-task/export'
	}],
	columns: [{
		text: '配件编码',
		dataIndex: 'partCode',
		width: 100,
		locked: true
	}, {
		text: '操作',
		locked: true,
		align: 'center',
		width: 120,
		renderer: function(data, metadata, record) {
			var html = [];

			html.push('<a href="javascript:void(0);" data-action="pegging" class="btn-tb-link-small">反查结构</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		width: 120
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		width: 120
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		width: 100
	}, {
		text: '维修件类型',
		dataIndex: 'servicePartTypeName',
		width: 120
	}]
});