Ext.define('App.view.partEngineering.servicePolicyChange.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.servicepolicychangegrid',
	store: 'App.store.partEngineering.ServicePolicyChange',
	multiSelectCheckbox: false,
	tbar: [{
		iconCls: 'x-fa fa-plus-square-o',
		tooltip: '新增',
		text: '新增',
		action: 'create',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/service-policy-change-manage/export'
	}],
	columns: [{
		text: '配件编码',
		dataIndex: 'partCode',
		locked: true,
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
		text: '配件备注(DRE)',
		dataIndex: 'partDescription',
		width: 120
	}, {
		text: '维修策略-前',
		dataIndex: 'oldServicePolicyCode',
		width: 120
	}, {
		text: '维修策略-后',
		dataIndex: 'newServicePolicyCode',
		width: 120
	}, {
		text: '变更执行人',
		dataIndex: 'createdBy',
		width: 120
	}, {
		text: '变更执行时间',
		dataIndex: 'createdDate',
		width: 140
	}, {
		text: '维修策略变更理由',
		dataIndex: 'changeReasonName',
		width: 120
	}]
});