Ext.define('App.view.basicInfo.serviceSupportType.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '维修支持类型',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '维修支持类型编码',
			name: 'code'
		}, {
			fieldLabel: '维修支持类型名称',
			name: 'name'
		}]
	}]
});