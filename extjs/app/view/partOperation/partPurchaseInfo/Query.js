Ext.define('App.view.partOperation.partPurchaseInfo.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.partpurchaseinfoquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'code'
		}, {
			fieldLabel: '配件名称',
			name: 'name'
		}, {
			fieldLabel: '采购工程师',
			xtype: 'basecombo',
			name: 'purchaseEngineerCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPP'
		}, {
			fieldLabel: '维修策略',
			xtype: 'basecombo',
			name: 'servicePolicyCode',
			withAll: true,
			displayFormat:'{code}-{name}',
			value: '',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			fieldLabel: '销售状态',
			xtype: 'basecombo',
			name: 'salesStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/sales-status/list'
		}, {
			fieldLabel: '采购状态',
			xtype: 'basecombo',
			name: 'purchaseStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/purchase-status/list'
		}, {
			fieldLabel: '采购需求',
			xtype: 'basecombo',
			name: 'purchaseDemandCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/purchase-demand/list'
		}, {
			xtype: 'datefield',
			fieldLabel: '需求更新时间-起',
			name: 'purchaseDemandDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '需求更新时间-止',
			name: 'purchaseDemandDate_E',
			format: 'Y-m-d'
		}]
	}]
});