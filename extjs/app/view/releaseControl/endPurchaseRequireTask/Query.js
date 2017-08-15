Ext.define('App.view.releaseControl.endPurchaseRequireTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.endpurchaserequiretaskquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			xtype: 'basecombo',
			fieldLabel: '采购工程师',
			name: 'purchaseEngineerCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPP'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修策略',
			name: 'servicePolicyCode',
			withAll: true,
			displayFormat:'{code}-{name}',
			value: '',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '销售状态',
			name: 'salesStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/sales-status/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '采购状态',
			name: 'purchaseStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/purchase-status/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '采购需求',
			name: 'purchaseDemandCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/purchase-demand/list'
		}, {
			xtype: 'datefield',
			fieldLabel: '停止需求时间-起',
			name: 'createdDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '停止需求时间-止',
			name: 'createdDate_E',
			format: 'Y-m-d'
		}]
	}]
});