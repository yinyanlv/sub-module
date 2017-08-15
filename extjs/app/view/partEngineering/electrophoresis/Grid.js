Ext.define('App.view.partEngineering.electrophoresis.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.electrophoresisgrid',
	store: 'App.store.partEngineering.Electrophoresis',
	multiSelectCheckbox: true,
	controlButtons: ['electrophoresis-edit'],
	tbar: [{
		iconCls: 'x-fa fa-edit',
		text: '修改',
		tooltip: '修改',
		action: 'electrophoresis-edit',
		disabled: true,
		singleSelectEnable: true,
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/electrophoresis/export'
	}],
	columns: [{
		text: '配件编码',
		dataIndex: 'code',
		locked: true,
		width: 120
	}, {
		text: '配件中文名称',
		dataIndex: 'nameZh',
		width: 140
	}, {
		text: '配件英文名称',
		dataIndex: 'nameEn',
		width: 140
	}, {
		text: '配件备注(DRE)',
		dataIndex: 'description',
		width: 140
	}, {
		text: '电泳底漆件分类',
		dataIndex: 'elposPrimsColorOptionName',
		width: 120
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		width: 120
	}, {
		text: '采购需求',
		dataIndex: 'purchaseDemandName',
		width: 120
	}, {
		text: '采购状态',
		dataIndex: 'purchaseStatusName',
		width: 120
	}, {
		text: '销售状态',
		dataIndex: 'salesStatusName',
		width: 120
	}, {
		text: '原始件编码',
		dataIndex: 'originalPartCode',
		width: 120
	}, {
		text: '原始件中文名称',
		dataIndex: 'originalPartNameZh',
		width: 140
	}, {
		text: '原始件英文名称',
		dataIndex: 'originalPartNameEn',
		width: 140
	}, {
		text: '原始件维修策略',
		dataIndex: 'originalServicePolicyName',
		width: 120
	}, {
		text: '原始件采购需求',
		dataIndex: 'originalPurchaseDemandName',
		width: 120
	}, {
		text: '原始件采购状态',
		dataIndex: 'originalPurchaseStatusName',
		width: 120
	}, {
		text: '原始件销售状态',
		dataIndex: 'originalSalesStatusName',
		width: 120
	}, {
		text: '创建人',
		dataIndex: 'createdBy',
		width: 100
	}, {
		text: '创建时间',
		dataIndex: 'createdDate',
		width: 140
	}, {
		text: '修改人',
		dataIndex: 'modifiedBy',
		width: 100
	}, {
		text: '修改时间',
		dataIndex: 'modifiedDate',
		width: 140
	}]
});