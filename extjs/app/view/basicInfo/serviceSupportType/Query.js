Ext.define('App.view.basicInfo.serviceSupportType.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.servicesupporttypequery',
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