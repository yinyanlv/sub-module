Ext.define('App.view.generalSettings.taskRuleManagement.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.taskrulemanagementquery',
	items: [{
		items: [{
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/brand/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '车系',
			name: 'seriesCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/series/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SMT',
			name: 'smtCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/smt/list'
		}, {
			fieldLabel: 'FNA',
			name: 'upcfnaCode'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'STE',
			name: 'steCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SPL',
			name: 'splCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'PKG',
			name: 'pkgCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=PKG'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SPP',
			name: 'sppCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPP'
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