Ext.define('App.view.partEngineering.partsDetail.PartsProperty', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.partsdetailpartsproperty',
	title: '配件属性、维修工程',
	style: 'background-color:#fff',
	layout: 'column',
	defaults: {
		xtype: 'textfield',
		width: 200,
		labelWidth: 110,
		margin: '0 10 5 0',
		columnWidth: 0.16,
		readOnly: true
	},
	items: [{
		fieldLabel: '配件编码',
		name: 'code'
	}, {
		fieldLabel: '配件中文名称',
		name: 'nameZh'
	}, {
		fieldLabel: '配件英文名称',
		name: 'nameEn'
	}, {
		fieldLabel: '配件备注(DRE)',
		name: 'description'
	}, {
		xtype: 'basecombo',
		fieldLabel: '配件分类',
		name: 'partClassifyCode',
		readOnly: false,
		url: App.globalConfig.path + '/combo/part-classify/list'
	}, {
		fieldLabel: '配件备注(SAP)',
		name: 'sapNote'
	}, {
		fieldLabel: '配件备注(STE)',
		name: 'afterSaleNote',
		readOnly: false,
		maxLength: 500
	}, {
		fieldLabel: '参考生产件号',
		name: 'referProductionPartCode'
	}, {
		fieldLabel: '配件类型(PLM)',
		name: 'plmPartType'
	}, {
		fieldLabel: '是否颜色件(PLM)',
		name: 'plmIsColorPartName'
	}, {
		fieldLabel: '设计阶段',
		name: 'designStageName'
	}, {
		fieldLabel: '设计职责',
		name: 'designResponsibility'
	}, {
		fieldLabel: '分组号',
		name: 'positionNo'
	}, {
		fieldLabel: 'SMT',
		name: 'smtName'
	}, {
		fieldLabel: '所有者(PLM)',
		name: 'plmOwner'
	}, {
		fieldLabel: '初始项目',
		name: 'initialProject'
	}, {
		xtype: 'selectorfield',
		fieldLabel: '海关编码',
		name: 'hscode',
		editable: false,
		readOnly: false,
		enableKeyEvents: true,
		allowBlank: true,
		windowTitle: '选择海关编码',
		searchInputConfig: {
			flex: 1,
			labelPad: 10,
			labelWidth: 120,
			fieldLabel: '对应商品名称',
			toUppercase: true
		},
		readUrl: App.globalConfig.path + '/hscode/page',
		fields: [{
			name: 'code',
			mapping: 'hscode'
		}],
		paramFields: ['commodityDesc'],
		columns: [{
			text: "序号",
			xtype: 'rownumberer',
			align: 'center',
			width: 60
		}, {
			text: '海关编码',
			dataIndex: 'code',
			width: 150
		}, {
			text: '对应商品名称',
			dataIndex: 'commodityDesc',
			flex: 1
		}]
	}, {
		xtype: 'basecombo',
		fieldLabel: '是否追溯件',
		readOnly: false,
		name: 'isTracePartCode',
		url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_trace_part'
	}, {
		xtype: 'basecombo',
		fieldLabel: '是否保养件',
		readOnly: false,
		name: 'isMaintainPartCode',
		url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_maintain_part'
	}, {
		xtype: 'basecombo',
		fieldLabel: '是否易损件',
		readOnly: false,
		name: 'isVulnerablePartCode',
		url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_vulnerable_part'
	}, {
		xtype: 'basecombo',
		fieldLabel: '是否事故件',
		readOnly: false,
		name: 'isAccidentPartCode',
		url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_accident_part'
	}, {
		xtype: 'basecombo',
		fieldLabel: '损坏周期',
		readOnly: false,
		name: 'damageCycleCode',
		url: App.globalConfig.path + '/combo/damage-cycle/list'
	}, {
		xtype: 'textfield',
		fieldLabel: '上下线备注',
		readOnly: false,
		columnWidth: 0.32,
		name: 'onlineOfflineNote',
		maxLength: 500
	}]
});