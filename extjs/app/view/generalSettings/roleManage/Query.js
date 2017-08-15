Ext.define('App.view.generalSettings.roleManage.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.rolequery',
	items: [{
		items: [{
			fieldLabel: '用户类型编码',
			name: 'code'
		}, {
			fieldLabel: '用户类型名称',
			name: 'name'
		}]
	}]
});