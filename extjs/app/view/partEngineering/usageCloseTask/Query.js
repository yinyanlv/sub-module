Ext.define('App.view.partEngineering.usageCloseTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.usageclosetaskquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}]
	}]
});