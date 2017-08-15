Ext.define('App.view.generalSettings.userManage.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	requires: [
		'Ext.ux.component.combo.GroupCombo'
	],
	title: '修改用户',
	updateDisableItems: ['code', 'name'],
	items: [{
		items: [{
			fieldLabel: '用户编码',
			name: 'code'
		}, {
			fieldLabel: '用户名称',
			name: 'name'
		}, {
			xtype: 'basecombo',
			fieldLabel: '用户类型',
			name: 'typeCodes',
			multiSelect: true,
			maxLength: 500,
			url: App.globalConfig.path + '/combo/usertype/list'
		}]
	}]
});