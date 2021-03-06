Ext.define('App.view.partOperation.packageMaterialInfo.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.packagematerialinfoquery',
	items: [{
		items: [{
			fieldLabel: '包装材料编码',
			name: 'code'
		}, {
			fieldLabel: '包装材料描述',
			name: 'description'
		}, {
			fieldLabel: '包装材料类型',
			name: 'type'
		}, {
			fieldLabel: '创建人',
			name: 'createdBy'
		}, {
			xtype: 'datefield',
			fieldLabel: '创建时间-起',
			name: 'createdDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '创建时间-止',
			name: 'createdDate_E',
			format: 'Y-m-d'
		}, {
			fieldLabel: '修改人',
			name: 'modifiedBy'
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