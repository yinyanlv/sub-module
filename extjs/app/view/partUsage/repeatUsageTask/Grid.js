Ext.define('App.view.partUsage.repeatUsageTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.repeatusagetaskgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partUsage.RepeatUsageTask',
	controlButtons: ['batch-complete'],
	tbar: [{
		iconCls: 'x-fa fa-edit',
		text: '批量完成',
		tooltip: '批量完成',
		action: 'batch-complete',
		disabled: true,
		singleSelectEnable: false,
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/repeat-usage-task/export'
	}],
	columns: [{
		text: '父配件编码',
		dataIndex: 'parentPartCode',
		locked: true,
		width: 140
	}, {
		text: '操作',
		locked: true,
		align: 'center',
		width: 140,
		renderer: function(data, metadata, record) {
			var html = [];

			html.push('<a href="javascript:void(0);" data-action="complete"  class="btn-tb-link-small">完成</a>');
			html.push('<a href="javascript:void(0);" data-action="act"  class="btn-tb-link-small">ACT</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '父配件中文名称',
		dataIndex: 'parentPartNameZh',
		width: 160
	}, {
		text: '父配件英文名称',
		dataIndex: 'parentPartNameEn',
		width: 160
	}, {
		text: '父配件FNA',
		dataIndex: 'parentPartSupcfnaCode',
		width: 140
	}, {
		text: '父配件功能地址中文描述',
		dataIndex: 'parentPartSupcfnaNoteZh',
		width: 160
	}, {
		text: '父配件功能地址英文描述',
		dataIndex: 'parentPartSupcfnaNoteEn',
		width: 160
	}, {
		text: '配件编码',
		dataIndex: 'partCode',
		width: 140
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		width: 160
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		width: 160
	}, {
		text: '子配件FNA',
		dataIndex: 'supcfnaCode',
		width: 120
	}, {
		text: '子配件功能地址中文描述',
		dataIndex: 'supcfnaNoteZh',
		width: 160
	}, {
		text: '子配件功能地址英文描述',
		dataIndex: 'supcfnaNoteEn',
		width: 160
	}, {
		text: '子件维修策略',
		dataIndex: 'servicePolicyName',
		width: 100
	}, {
		text: 'SPL',
		dataIndex: 'splName',
		width: 120
	}, {
		text: '任务状态',
		dataIndex: 'taskStatusName',
		width: 100
	}, {
		text: '任务创建日期',
		dataIndex: 'startDate',
		width: 140
	}, {
		text: '任务结束日期',
		dataIndex: 'endDate',
		width: 140
	}]
});