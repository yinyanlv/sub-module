Ext.define('App.view.syncEngineering.devPartTraceTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.devparttracetaskgrid',
	store: 'App.store.syncEngineering.DevPartTraceTask',
	multiSelectCheckbox: true,
	controlButtons: ['batch-complete', 'assign-ste', 'note'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/develop-part-track-task/export'
	}, {
		xtype: 'button',
		text: '批量完成',
		action: 'batch-complete',
		disabled: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '强制修改STE',
		action: 'assign-ste',
		disabled: true,
		singleSelectEnable: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar',
		enableCondition: {
			name: 'taskStatusCode',
			value: 0
		}
	}, {
		xtype: 'button',
		text: '备注',
		action: 'note',
		disabled: true,
		singleSelectEnable: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar'
	}],
	columns: [{
		text: '操作',
		locked: true,
		align: 'center',
		width: 200,
		renderer: function(data, metadata, record) {
			var html = [];

			if (!record.get('taskStatusCode')) {
				html.push('<a href="javascript:void(0);" data-action="complete"  class="btn-tb-link-small">完成</a>');
			} else {
				html.push('<a href="javascript:void(0);" data-action="enable"  class="btn-tb-link-small">激活</a>');
			}
			html.push('<a href="javascript:void(0);" data-action="act"  class="btn-tb-link-small">ACT</a>');
			html.push('<a href="javascript:void(0);" data-action="history"  class="btn-tb-link-small">操作历史</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '配件编码(PLM)',
		dataIndex: 'partCode',
		width: 120,
		locked: true
	}, {
		text: '配件初始版本',
		dataIndex: 'partinitialVersion',
		width: 120
	}, {
		text: '配件当前版本',
		dataIndex: 'partCurrentVersion',
		width: 120
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		width: 120
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		width: 120
	}, {
		text: '任务状态',
		dataIndex: 'taskStatusName',
		width: 120
	}, {
		text: '任务创建日期',
		dataIndex: 'startDate',
		width: 140
	}, {
		text: '任务结束日期',
		dataIndex: 'endDate',
		width: 140
	}, {
		text: '设计阶段',
		dataIndex: 'designStageName',
		width: 140
	}, {
		text: 'SMT',
		dataIndex: 'smtName',
		width: 120
	}, {
		text: 'DRE',
		dataIndex: 'dreName',
		width: 120
	}, {
		text: '推荐STE',
		dataIndex: 'oldSteName',
		width: 120
	}, {
		text: '当前STE',
		dataIndex: 'newSteName',
		width: 120
	}, {
		text: '修改STE备注',
		dataIndex: 'modifySteNote',
		width: 120
	}, {
		text: '修改STE日期',
		dataIndex: 'modifySteDate',
		width: 140
	}, {
		text: '配件类型(PLM)',
		dataIndex: 'plmPartTypeName',
		width: 120
	}, {
		text: 'Make/Buy',
		dataIndex: 'makeOrBuy',
		width: 120
	}, {
		text: 'Partition Code',
		dataIndex: 'partitionCode',
		width: 120
	}, {
		text: 'FNA',
		dataIndex: 'fna',
		width: 120
	}, {
		text: '初始车系',
		dataIndex: 'initialSeriesName',
		width: 120
	}, {
		text: '是否颜色件',
		dataIndex: 'isColorAccessoryName',
		width: 120
	}, {
		text: '设计职责',
		dataIndex: 'designResponsibility',
		width: 120
	}, {
		text: '描述',
		dataIndex: 'description',
		width: 120
	}, {
		text: '跟踪备注',
		dataIndex: 'trackNote',
		width: 120
	}]
});