Ext.define('App.view.partEngineering.eco.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.ecogrid',
	store: 'App.store.partEngineering.ECO',
	multiSelectCheckbox: false,
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/eco/export'
	}],
	columns: [{
		text: '操作',
		locked: true,
		align: 'center',
		width: 80,
		renderer: function(data, metadata, record) {
			var html = [],
				ecoCode = record.get('ecoCode'),
				url = App.globalConfig.path + '/eco/detail-page/' + ecoCode;

			html.push('<a href="' + url + '" data-action="detail" target="_blank" class="btn-tb-link-small">详细</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: 'ECO编码',
		dataIndex: 'ecoCode',
		locked: true,
		width: 120
	}, {
		text: 'ECO描述',
		dataIndex: 'ecoDescription',
		width: 120
	}, {
		text: '变更所有者',
		dataIndex: 'ecoOwner',
		width: 140
	}, {
		text: 'SMT',
		dataIndex: 'ecoSmt',
		width: 120
	}, {
		text: '影响项目',
		dataIndex: 'ecoAffectedVehicles',
		width: 120
	}, {
		text: 'ECR编码',
		dataIndex: 'ecrCode',
		width: 120
	}, {
		text: 'ECR发起者',
		dataIndex: 'ecrChangeInitiator',
		width: 120
	}, {
		text: 'ECR协调者',
		dataIndex: 'ecrChangeCoordinator',
		width: 140
	}, {
		text: 'ECR有无协同变更',
		dataIndex: 'ecrCoordinatorChangeName',
		width: 120
	}, {
		text: '协同关联ECR编码',
		dataIndex: 'ecrRelatedCrNumber',
		width: 120
	}, {
		text: 'ECR变更方案',
		dataIndex: 'ecrProposedChange',
		width: 120
	}, {
		text: 'ECR变更原因',
		dataIndex: 'ecrReasonForChange',
		width: 120
	}, {
		text: 'ECR影响配置',
		dataIndex: 'ecrAffectedOptions',
		width: 140
	}, {
		text: 'ECR影响工厂',
		dataIndex: 'ecrAffectedPlants',
		width: 140
	}, {
		text: 'ECR影响组织',
		dataIndex: 'ecrSmtTeamAffected',
		width: 140
	}, {
		text: 'ECR预估断点时间',
		dataIndex: 'ecrForecastBreakpoint',
		width: 140
	}]
});