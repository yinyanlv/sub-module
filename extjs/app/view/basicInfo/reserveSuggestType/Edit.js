Ext.define('App.view.basicInfo.reserveSuggestType.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '储备建议类型',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '储备建议类型编码',
			name: 'code',
			maxLength: 50
		}, {
			fieldLabel: '储备建议类型名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});