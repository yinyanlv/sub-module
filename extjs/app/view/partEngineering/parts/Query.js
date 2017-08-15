Ext.define('App.view.partEngineering.parts.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.partsquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'code'
		}, {
			fieldLabel: '配件名称',
			name: 'name'
		}, {
			fieldLabel: '配件备注',
			name: 'note'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SMT',
			name: 'smtCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/smt/list'
		},{
            xtype: 'basecombo',
            fieldLabel: '维修策略',
            name: 'servicePolicyCode',
            displayFormat:'{code}-{name}',
            withAll: true,
            value: '',
            url: App.globalConfig.path + '/combo/service-policy/list'
        }, {
			xtype: 'basecombo',
			fieldLabel: '维修件类型',
			name: 'servicePartTypeCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-part-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修支持类型',
			name: 'serviceSupportTypeCode',
			withAll: true,
			displayFormat: '{code}-{name}',
			value: '',
			url: App.globalConfig.path + '/combo/service-support-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '处理建议:',
			name: 'treatmentProposalCode',
			withAll: true,
			value: '',
			displayFormat:'{code}-{name}',
			url: App.globalConfig.path + '/combo/treatment-proposal/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'STE',
			name: 'steCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'basecombo',
			fieldLabel: '是否追溯件',
			name: 'isTracePartCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_trace_part'
		}, {
			xtype: 'basecombo',
			fieldLabel: '是否保养件',
			name: 'isMaintainPartCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_maintain_part'
		}, {
			xtype: 'basecombo',
			fieldLabel: '是否易损件',
			name: 'isVulnerablePartCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_vulnerable_part'
		}, {
			xtype: 'basecombo',
			fieldLabel: '是否事故件',
			name: 'isAccidentPartCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_accident_part'
		}, {
			xtype: 'basecombo',
			fieldLabel: '采购需求',
			name: 'purchaseDemandCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/purchase-demand/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '采购状态',
			name: 'purchaseStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/purchase-status/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '销售状态',
			name: 'salesStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/sales-status/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '库存状态',
			name: 'stockStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/stock-status/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '定价状态',
			name: 'pricingStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/pricing-status/list'
		}, {
			fieldLabel: '修改人',
			name: 'modifiedBy'
		}, {
			xtype: 'datefield',
			fieldLabel: '修改时间-起',
			name: 'modifiedDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '修改时间-止',
			name: 'modifiedDate_E',
			format: 'Y-m-d'
		}]
	}]
});