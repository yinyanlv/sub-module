Ext.define('App.view.legendCatalog.legendCatalogList.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '品牌',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '品牌编码',
			name: 'code'
		}, {
			fieldLabel: '品牌名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});