Ext.define('App.view.partEngineering.partStructQuery.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.partstructquerygrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partEngineering.PartStructQuery',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/part-act-structure/export'
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
		width: 80,
		renderer: function(data, metadata, record) {
			var html = [];

			html.push('<a href="javascript:void(0);" data-action="pegging" target="_target" class="btn-tb-link-small">ACT</a>');

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
	}, {
		text: '父配件编码',
		dataIndex: 'parentPartCode',
		width: 120
	}, {
		text: '父配件中文名称',
		dataIndex: 'parentPartNameZh',
		width: 120
	}, {
		text: '父配件英文名称',
		dataIndex: 'parentPartNameEn',
		width: 120
	}, {
		text: '用量',
		dataIndex: 'qty',
		width: 80
	}, {
		text: '用法状态',
		dataIndex: 'usageStatusName',
		width: 100
	}, {
		text: '删除标识',
		dataIndex: 'deletedName',
		width: 100
	}]
});