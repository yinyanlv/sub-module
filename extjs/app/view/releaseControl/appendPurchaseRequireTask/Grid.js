Ext.define('App.view.releaseControl.appendPurchaseRequireTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.appendpurchaserequiretaskgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.releaseControl.AppendPurchaseRequireTask',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/new-purchase-demand-task/export'
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
		text: '生产有无使用',
		dataIndex: 'doProductionUseName',
		width: 120
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		width: 120
	}, {
		text: '维修策略更新时间',
		dataIndex: 'servicePolicyModifiedDate',
		width: 140
	}, {
		text: '配件有效期',
		dataIndex: 'validityPeriod',
		width: 120
	}, {
		text: '采购工程师',
		dataIndex: 'purchaseEngineerName',
		width: 120
	}, {
		text: '采购需求',
		dataIndex: 'purchaseDemandName',
		width: 120
	}, {
		text: '新增采购需求时间',
		dataIndex: 'createdDate',
		width: 140
	}]
});