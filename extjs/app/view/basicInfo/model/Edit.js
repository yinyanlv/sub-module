Ext.define('App.view.basicInfo.model.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '车型',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			url: App.globalConfig.path + '/combo/brand/list',
			clearFields: ['seriesCode']
		}, {
			xtype: 'basecombo',
			fieldLabel: '车系',
			name: 'seriesCode',
			dependFields: ['brandCode'],
			url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
		}, {
			fieldLabel: '车型编码',
			name: 'code'
		}, {
			fieldLabel: '车型名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});