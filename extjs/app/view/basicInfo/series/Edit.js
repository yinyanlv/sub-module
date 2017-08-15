Ext.define('App.view.basicInfo.series.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '车系',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			url: App.globalConfig.path + '/combo/brand/list'
		}, {
			fieldLabel: '车系编码',
			name: 'code'
		}, {
			fieldLabel: '车系名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});