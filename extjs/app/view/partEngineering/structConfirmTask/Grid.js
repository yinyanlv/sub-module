Ext.define('App.view.partEngineering.structConfirmTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.structconfirmtaskgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partEngineering.StructConfirmTask',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/act-confirm-task/export'
	}],
	columns: [{
		text: '父配件编码',
		dataIndex: 'parentPartCode',
		width: 120,
		locked: true
	}, {
		text: '操作',
		locked: true,
		align: 'center',
		width: 80,
		renderer: function(data, metadata, record) {
			var html = [];

			html.push('<a href="javascript:void(0);" data-action="pegging" target="_target" class="btn-tb-link-small">ACT</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '父配件中文名称',
		dataIndex: 'parentPartNameZh',
		width: 150
	}, {
		text: '父配件英文名称',
		dataIndex: 'parentPartNameEn',
		width: 150
	}, {
		text: '配件编码',
		dataIndex: 'partCode',
		width: 100
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		width: 150
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		width: 150
	}, {
		text: 'SPL',
		dataIndex: 'splName',
		width: 50
	}, {
		text: '来源',
		dataIndex: 'source',
		width: 50
	}, {
		text: '是否继承结构',
		dataIndex: 'isInheritanceStructureName',
		width: 120
	}, {
		text: '确认状态',
		dataIndex: 'isConfirmName',
		width: 100
	}, {
		text: '确认结果',
		dataIndex: 'isAdoptName',
		width: 100
	}, {
		text: '确认时间',
		dataIndex: 'confirmDate',
		width: 100
	}, {
		text: '确认人',
		dataIndex: 'confirmBy',
		width: 100
	}]
});