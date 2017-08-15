Ext.define('App.view.partOperation.partPackageInfo.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.partpackageinfoquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'code'
		}, {
			fieldLabel: '配件名称',
			name: 'name'
		}, {
			fieldLabel: '包装工程师',
			xtype: 'basecombo',
			name: 'packageEngineerCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=PKG'
		}, {
			fieldLabel: '包材是否为空',
			xtype: 'basecombo',
			name: 'packageMaterialCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_undefined'
		}, {
			fieldLabel: '维修策略',
			xtype: 'basecombo',
			name: 'servicePolicyCode',
			withAll: true,
			value: '',
			displayFormat:'{code}-{name}',
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
		}]
	}]
});