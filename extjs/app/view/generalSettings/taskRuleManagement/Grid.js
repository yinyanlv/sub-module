Ext.define('App.view.generalSettings.taskRuleManagement.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.taskrulemanagementgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.generalSettings.TaskRuleManagement',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		iconCls: 'x-fa fa-edit',
		text: '修改',
		tooltip: '修改',
		action: 'update',
		disabled: true,
		singleSelectEnable: true,
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '批量更新',
		action: 'import',
		iconCls: 'iconfont icon-import',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/task-rule/export'
	}],
	columns: [{
		text: '品牌名称',
		dataIndex: 'brandName',
		width: 140,
		locked: true
	}, {
		text: '车系名称',
		dataIndex: 'seriesName',
		width: 140,
		locked: true
	}, {
		text: 'SMT',
		dataIndex: 'smtName',
		width: 100,
		locked: true
	}, {
		text: 'FNA',
		dataIndex: 'upcfnaCode',
		width: 100,
		locked: true
	}, {
		text: '配件功能地址中文描述',
		dataIndex: 'upcfnaNoteZh',
		width: 180
	}, {
		text: '配件功能地址英文描述',
		dataIndex: 'upcfnaNoteEn',
		width: 180
	}, {
		text: 'STE',
		dataIndex: 'steName',
		width: 100
	}, {
		text: 'SPL',
		dataIndex: 'splName',
		width: 100
	}, {
		text: 'PKG',
		dataIndex: 'pkgName',
		width: 100
	}, {
		text: 'SPP',
		dataIndex: 'sppName',
		width: 100
	}, {
		text: '创建时间',
		dataIndex: 'createdDate',
		width: 140
	}, {
		text: '修改人',
		dataIndex: 'modifiedBy',
		width: 120
	}, {
		text: '修改时间',
		dataIndex: 'modifiedDate',
		width: 140
	}]
});