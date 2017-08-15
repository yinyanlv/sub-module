Ext.define('App.view.generalSettings.taskRuleManagement.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '任务规则管理',
	items: [{
		defaults: {
			xtype: 'basecombo'
		},
		items: [{
			xtype: 'displayfield',
			fieldLabel: '品牌',
			name: 'brandCode'
		}, {
			xtype: 'displayfield',
			fieldLabel: '车系',
			name: 'seriesCode'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'STM',
			name: 'smtCode'
		}, {
			xtype: 'displayfield',
			fieldLabel: 'FNA',
			name: 'upcfnaCode'
		}, {
			fieldLabel: 'STE',
			name: 'steCode',
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			fieldLabel: 'SPL',
			name: 'splCode',
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
		}, {
			fieldLabel: 'PKG',
			name: 'pkgCode',
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=PKG'
		}, {
			fieldLabel: 'SPP',
			name: 'sppCode',
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPP'
		}]
	}]
});