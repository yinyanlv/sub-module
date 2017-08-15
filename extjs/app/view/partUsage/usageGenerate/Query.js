Ext.define('App.view.partUsage.usageGenerate.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.usagegeneratequery',
	items: [{
		items: [{
			fieldLabel: '品牌',
			xtype: 'basecombo',
			name: 'brandCode',
			withAll: false,
			allowBlank: false,
			url: App.globalConfig.path + '/combo/brand/list',
			clearFields: ['seriesCode']
		}, {
			fieldLabel: '车系',
			xtype: 'basecombo',
			name: 'seriesCode',
			withAll: false,
			allowBlank: false,
			dependFields: ['brandCode'],
			url: App.globalConfig.path + '/combo/multi-brand-series/list?type={brandCode}'
		}, {
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			fieldLabel: 'FNA',
			name: 'supcfnaCode'
		}, {
			fieldLabel: '是否有多条用法',
			xtype: 'basecombo',
			name: 'hasMultipleUsageCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=has_multiple_usage'
		}, {
			fieldLabel: 'SPL',
			name: 'splCode',
			xtype: 'basecombo',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
		}, {
			fieldLabel: '用法状态',
			name: 'usageStatusCode',
			xtype: 'basecombo',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/usage-status/list'
		}]
	}]
});