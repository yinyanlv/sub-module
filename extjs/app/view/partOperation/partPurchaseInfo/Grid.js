Ext.define('App.view.partOperation.partPurchaseInfo.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.partpurchaseinfogrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.partOperation.PartPurchaseInfo',
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
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/part-purchase/export'
	}],
	columns: [{
		text: '配件编码',
		dataIndex: 'code',
		width: 140,
		locked: true
	}, {
		text: '操作',
		locked: true,
		align: 'center',
		width: 100,
		renderer: function(data, metadata, record) {
			var code = record.get('code'),
				partUrl = App.globalConfig.path + '/part/detail-page/' + code;

			return '<a href="' + partUrl + '" data-action="part" target="_blank" class="btn-tb-link-small">Part</a>';
		}
	}, {
		text: '配件中文名称',
		dataIndex: 'nameZh',
		width: 140
	}, {
		text: '配件英文名称',
		dataIndex: 'nameEn',
		width: 140
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		width: 100
	}, {
		text: '维修策略更新时间',
		dataIndex: 'servicePolicyDetermineDate',
		width: 140
	}, {
		text: '配件有效期',
		dataIndex: 'validityPeriod',
		width: 140
	}, {
		text: '采购工程师',
		dataIndex: 'purchaseEngineerName',
		width: 100
	}, {
		text: '采购需求',
		dataIndex: 'purchaseDemandName',
		width: 100
	}, {
		text: '采购需求更新时间',
		dataIndex: 'purchaseDemandDate',
		width: 140
	}, {
		text: '采购状态',
		dataIndex: 'purchaseStatusName',
		width: 80
	}, {
		text: '采购状态同步时间',
		dataIndex: 'purchaseStatusSyncDate',
		width: 140
	}, {
		text: '销售状态',
		dataIndex: 'salesStatusName',
		width: 80
	}, {
		text: '销售状态同步时间',
		dataIndex: 'salesStatusSyncDate',
		width: 140
	}, {
		text: '供应商编码',
		dataIndex: 'supplierCode',
		width: 140
	}, {
		text: '供应商名称',
		dataIndex: 'supplierName',
		width: 160
	}, {
		text: '供应商联系方式',
		dataIndex: 'supplierTele',
		width: 120
	}, {
		text: '供应商联系人',
		dataIndex: 'supplierContact',
		width: 100
	}, {
		text: '供应商配件编号',
		dataIndex: 'supplierPartCode',
		width: 140
	}, {
		text: '采购信息更新人',
		dataIndex: 'purchaseModifiedBy',
		width: 100
	}, {
		text: '采购信息更新时间',
		dataIndex: 'purchaseModifiedDate',
		width: 140
	}]
});