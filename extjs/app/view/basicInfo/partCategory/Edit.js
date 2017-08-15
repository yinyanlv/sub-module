Ext.define('App.view.basicInfo.partCategory.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '配件分类',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '配件分类编码',
			name: 'code',
			maxLength: 50
		}, {
			fieldLabel: '配件分类名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});