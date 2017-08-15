Ext.define('App.view.partEngineering.purchasedPartSplit.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.purchasedpartsplitgrid',
	store: 'App.store.partEngineering.PurchasedPartSplit',
	multiSelectCheckbox: false,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/user-type/export'
	}, {
		xtype: 'button',
		text: '导入更新',
		action: 'batch-complete',
		singleSelectEnable: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar'
	}, {
		xtype: 'button',
		text: '强制修改STE',
		action: 'update',
		disabled: true,
		singleSelectEnable: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar'
	}],
	columns: [{
		text: '操作',
		locked: true,
		align: 'center',
		width: 140,
		renderer: function(data, metadata, record) {
			var html = [];

			html.push('<a href="javascript:void(0);" data-action="part" target="_blank" class="btn-tb-link-small">Part</a>');
			html.push('<a href="javascript:void(0);" data-action="detail" target="_blank" class="btn-tb-link-small">维护</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
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
		dataIndex: 'description',
		width: 120
	}, {
		text: '系统推荐维修策略',
		dataIndex: 'recommendServicePolicyName',
		width: 120
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		width: 120
	}, {
		text: '维修支持类型',
		dataIndex: 'serviceSupportTypeName',
		width: 120
	}, {
		text: '支持类型备注(note)',
		dataIndex: 'serviceSupportTypeNote',
		width: 140
	}, {
		text: '维修件类型',
		dataIndex: 'servicePartTypeName',
		width: 120
	}, {
		text: '颜色件颜色',
		dataIndex: 'plmColors',
		width: 120
	}, {
		text: '处理建议',
		dataIndex: 'treatmentProposalName',
		width: 120
	}, {
		text: '任务状态',
		dataIndex: 'taskStatusName',
		width: 120
	}, {
		text: '任务创建日期',
		dataIndex: 'startDate',
		width: 120
	}, {
		text: '任务结束日期',
		dataIndex: 'endDate',
		width: 120
	}, {
		text: 'ECR编码',
		dataIndex: 'ecrCode',
		width: 120
	}, {
		text: '参考生产件号',
		dataIndex: 'referProductionPartCode',
		width: 120
	}, {
		text: '设计阶段',
		dataIndex: 'designStageName',
		width: 120
	}, {
		text: '来源',
		dataIndex: 'source',
		width: 120
	}, {
		text: '产品FNA',
		dataIndex: 'productUpcfnas',
		width: 120
	}, {
		text: '父配件号',
		dataIndex: 'parentPartCodes',
		width: 120
	}, {
		text: '一级总成件号',
		dataIndex: 'oneLevelPartCodes',
		width: 120
	}, {
		text: 'SMT',
		dataIndex: 'smtName',
		width: 120
	}, {
		text: '推荐STE',
		dataIndex: 'recommendSteName',
		width: 120
	}, {
		text: '当前STE',
		dataIndex: 'steName',
		width: 120
	}, {
		text: '修改STE日期',
		dataIndex: 'steModifiedDate',
		width: 120
	}, {
		text: '修改STE备注',
		dataIndex: 'steModifiedNote',
		width: 120
	}, {
		text: '配件类型(PLM)',
		dataIndex: 'plmPartType',
		width: 150
	}, {
		text: '初始 Make/Buy',
		dataIndex: 'initialMakeOrBuy',
		width: 120
	}, {
		text: '设计职责',
		dataIndex: 'designResponsibility',
		width: 120
	}, {
		text: '是否可维修件(PLM)',
		dataIndex: 'plmIsServicePart',
		width: 140
	}, {
		text: '是否备件(PLM)',
		dataIndex: 'plmIsSparePart',
		width: 120
	}, {
		text: '初始化项目',
		dataIndex: 'initialProject',
		width: 120
	}, {
		text: '设计协同',
		dataIndex: 'designCollaboration',
		width: 120
	}, {
		text: '协同空间',
		dataIndex: 'collaborationSpace',
		width: 120
	}, {
		text: '是否颜色件(PLM)',
		dataIndex: 'plmIsColorPart',
		width: 120
	}, {
		text: '配件备注(PLM)',
		dataIndex: 'plmNote',
		width: 120
	}, {
		text: '配件备注(SAP)',
		dataIndex: 'sapNote',
		width: 120
	}, {
		text: '配件备注(STE)',
		dataIndex: 'afterSaleNote',
		width: 120
	}]
});