Ext.define('App.view.partEngineering.servicePolicyChange.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.servicepolicychangequery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			xtype: 'datefield',
			fieldLabel: '变更执行时间-起',
			name: 'createdDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '变更执行时间-止',
			name: 'createdDate_E',
			format: 'Y-m-d'
		}, {
			fieldLabel: '执行人',
			name: 'createdBy'
		}]
	}]
});