Ext.define('App.view.partEngineering.partStructQuery.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.partstructqueryquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			xtype: 'basecombo',
			fieldLabel: '删除标识',
			name: 'deletedCode',
			value: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=deleted'
		}]
	}]
});