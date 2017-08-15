Ext.define('App.view.partEngineering.oldPartTask.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.oldparttaskgrid',
	store: 'App.store.partEngineering.OldPartTask',
	multiSelectCheckbox: false,
	controlButtons: ['assign-ste'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/old-part-task/export'
	}, {
		xtype: 'button',
		text: '强制修改STE',
		action: 'assign-ste',
		disabled: true,
		singleSelectEnable: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar',
		enableCondition: {
			name: 'taskStatusCode',
			value: 0
		}
	}],
	columns: [{
		text: '旧件编码',
		locked: true,
		dataIndex: 'oldPartCode',
		width: 120
	}, {
		text: '操作',
		locked: true,
		align: 'center',
		width: 140,
		renderer: function(data, metadata, record) {
			var html = [],
				oldPartCode = record.get('oldPartCode'),
				partUrl = App.globalConfig.path + '/part/detail-page/' + oldPartCode,
				detailUrl = App.globalConfig.path + '/old-part-task/detail-page/' + oldPartCode;

			html.push('<a href="' + partUrl + '" data-action="part" target="_blank" class="btn-tb-link-small">Part</a>');
			html.push('<a href="' + detailUrl + '" data-action="detail" target="_blank" class="btn-tb-link-small">维护</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '旧件中文名称',
		dataIndex: 'oldPartNameZh',
		width: 120
	}, {
		text: '旧件英文名称',
		dataIndex: 'oldPartNameEn',
		width: 120
	}, {
		text: '旧件维修策略',
		dataIndex: 'oldServicePolicyName',
		width: 120
	}, {
		text: '维修支持类型',
		dataIndex: 'serviceSupportTypeName',
		width: 120
	}, {
		text: '支持类型备注',
		dataIndex: 'serviceSupportTypeNote',
		width: 120
	}, {
		text: '是否标识过维修件',
		dataIndex: 'wasServicePart',
		width: 120
	}, {
		text: '旧件维修件类型',
		dataIndex: 'oldServicePartTypeName',
		width: 120
	}, {
		text: '任务状态',
		dataIndex: 'taskStatusName',
		width: 120
	}, {
		text: '任务创建日期',
		dataIndex: 'startDate',
		width: 140
	}, {
		text: '任务结束日期',
		dataIndex: 'endDate',
		width: 140
	}, {
		text: 'ECO编码',
		dataIndex: 'ecoCode',
		width: 120
	}, {
		text: 'ECR编码',
		dataIndex: 'ecrCode',
		width: 120
	}, {
		text: '替换类型',
		dataIndex: 'supersessionTypeName',
		width: 120
	}, {
		text: '处理建议',
		dataIndex: 'treatmentProposalName',
		width: 120
	}, {
		text: '替换后配件编码',
		dataIndex: 'newPartCode',
		width: 120
	}, {
		text: '替换后配件中文名称',
		dataIndex: 'newPartNameZh',
		width: 120
	}, {
		text: '替换后配件件英文名称',
		dataIndex: 'newPartNameEn',
		width: 120
	}, {
		text: '预估断点时间',
		dataIndex: 'forecastBreakPointDate',
		width: 140
	}, {
		text: '替换备注',
		dataIndex: 'supersessionNote',
		width: 120
	}, {
		text: '新件维修策略',
		dataIndex: 'newServicePolicyName',
		width: 120
	}, {
		text: '来源',
		dataIndex: 'source',
		width: 120
	}, {
		text: '旧件SMT',
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
		text: '修改STE备注',
		dataIndex: 'steModifiedNote',
		width: 180
	}, {
		text: '修改STE日期',
		dataIndex: 'steModifiedDate',
		width: 140
	}, {
		text: '旧件备注（SAP）',
		dataIndex: 'sapNote',
		width: 120
	}, {
		text: '旧件备注(售后)',
		dataIndex: 'afterSaleNote',
		width: 120
	}]
});