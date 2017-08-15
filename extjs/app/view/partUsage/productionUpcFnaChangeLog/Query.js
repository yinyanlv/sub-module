Ext.define('App.view.partUsage.productionUpcFnaChangeLog.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.productionupcfnachangelogquery',
	items: [{
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			fieldLabel: '修改前FNA',
			name: 'oldUpcfnaCode'
		}, {
			fieldLabel: '修改前描述',
			name: 'oldUpcfnaNote'
		}, {
			fieldLabel: '修改人',
			name: 'modifiedBy'
		}, {
			fieldLabel: '修改后FNA',
			name: 'newUpcfnaCode'
		}, {
			fieldLabel: '修改后描述',
			name: 'newUpcfnaNote'
		}, {
			xtype: 'datefield',
			fieldLabel: '修改时间-起',
			name: 'modifiedDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '修改时间-止',
			name: 'modifiedDate_E',
			format: 'Y-m-d'
		}]
	}]
});