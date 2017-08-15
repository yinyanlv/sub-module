Ext.define('App.view.partEngineering.serviceKit.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.servicekitgrid',
	store: 'App.store.partEngineering.ServiceKit',
	multiSelectCheckbox: false,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/service-kit/export'
	}],
	columns: [{
		text: '维修包编码',
		dataIndex: 'code',
		locked: true,
		width: 140
	}, {
		text: '操作',
		locked: true,
		align: 'center',
		width: 100,
		renderer: function(data, metadata, record) {
			var code = record.get('code'),
				url = App.globalConfig.path + '/service-kit/detail-page/' + code;

			return '<a href="' + url + '" data-action="detail" target="_blank" class="btn-tb-link-small">详细</a>';
		}
	}, {
		text: '维修包中文名称',
		dataIndex: 'nameZh',
		width: 160
	}, {
		text: '维修包英文名称',
		dataIndex: 'nameEn',
		width: 160
	}, {
		text: '维修包备注',
		dataIndex: 'note',
		width: 180
	}, {
		text: '父配件编码',
		dataIndex: 'parentPartCodes',
		width: 140,
		sortable: false
	}, {
		text: '父配件中文名称',
		dataIndex: 'parentPartNameZhs',
		width: 160,
		sortable: false
	}, {
		text: '父配件英文名称',
		dataIndex: 'parentPartNameEns',
		width: 160,
		sortable: false
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
		width: 100
	}, {
		text: '销售状态',
		dataIndex: 'salesStatusName',
		width: 100
	}, {
		text: '删除标识',
		dataIndex: 'deletedName',
		width: 100
	}, {
		text: '创建人',
		dataIndex: 'createdBy',
		width: 100
	}, {
		text: '创建时间',
		dataIndex: 'createdDate',
		width: 140
	}]
});