Ext.define('App.view.basicInfo.hsCode.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '海关编码',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '海关编码',
			name: 'code',
			maxLength: 50
		}, {
			fieldLabel: '对应商品描述',
			name: 'commodityDesc',
			maxLength: 200
		}, {
			fieldLabel: '报关要素',
			name: 'customsClearanceFactor',
			maxLength: 1000
		}]
	}]
});