Ext.define('App.view.basicInfo.bodyColor.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '车身颜色',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '颜色编码',
			name: 'code'
		}, {
			fieldLabel: '颜色名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});