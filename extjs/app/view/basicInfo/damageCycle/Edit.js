Ext.define('App.view.basicInfo.damageCycle.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '损坏周期',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '损坏周期编码',
			name: 'code'
		}, {
			fieldLabel: '损坏周期名称',
			name: 'name',
			maxLength: 200
		}]
	}]
});