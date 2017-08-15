Ext.define('App.view.releaseControl.endPurchaseRequireTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.endpurchaserequiretaskgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.releaseControl.EndPurchaseRequireTask',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/stop-purchase-demand-task/export'
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
			var html = [],
				code = record.get('partCode'),
				partUrl = App.globalConfig.path + '/part/detail-page/' + code

			html.push('<a href="' + partUrl + '" data-action="part" target="_blank" class="btn-tb-link-small">Part</a>');

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
		text: '维修策略更新时间',
		dataIndex: 'servicePolicyModifiedDate',
		width: 140
	}, {
		text: '配件有效期',
		dataIndex: 'validityPeriod',
		width: 120
	}, {
		text: '替换类型编码',
		dataIndex: 'supersessionTypeCode',
		width: 120
	}, {
		text: '替换类型名称',
		dataIndex: 'supersessionTypeName',
		width: 120
	}, {
		text: '处理建议编码',
		dataIndex: 'treatmentProposalCode',
		width: 120
	}, {
		text: '处理建议名称',
		dataIndex: 'treatmentProposalName',
		width: 120
	}, {
		text: '替换新件',
		dataIndex: 'newPartCode',
		width: 100
	}, {
		text: '采购工程师',
		dataIndex: 'purchaseEngineerName',
		width: 120
	}, {
		text: '采购需求',
		dataIndex: 'purchaseDemandName',
		width: 100
	}, {
		text: '停止采购需求时间',
		dataIndex: 'createdDate',
		width: 140
	}, {
		text: '采购状态',
		dataIndex: 'purchaseStatusName',
		width: 100
	}, {
		text: '采购状态同步时间',
		dataIndex: 'purchaseStatusModifiedDate',
		width: 140
	}, {
		text: '销售状态',
		dataIndex: 'salesStatusName',
		width: 100
	}, {
		text: '销售状态同步时间',
		dataIndex: 'salesStatusModifiedDate',
		width: 140
	}, {
		text: '供应商编码',
		dataIndex: 'supplierCode',
		width: 120
	}, {
		text: '供应商名称',
		dataIndex: 'supplierName',
		width: 120
	}, {
		text: '供应商联系方式',
		dataIndex: 'supplierTele',
		width: 120
	}, {
		text: '供应商联系人',
		dataIndex: 'supplierContact',
		width: 120
	}, {
		text: '供应商配件编码',
		dataIndex: 'supplierPartCode',
		width: 120
	}]
});