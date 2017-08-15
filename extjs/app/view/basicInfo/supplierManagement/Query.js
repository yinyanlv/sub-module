Ext.define('App.view.basicInfo.supplierManagement.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.suppliermanagementquery',
	items: [{
		items: [{
			fieldLabel: '供应商编码',
			name: 'code'
		}, {
			fieldLabel: '供应商名称',
			name: 'name'
		}]
	}]
});