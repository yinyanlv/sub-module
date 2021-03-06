Ext.define('App.view.partEngineering.serviceInfoPendingQuery.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.serviceInfopendingqueryquery',
	items: [{
		items: [{
			fieldLabel: 'ECO编码',
			name: 'ecoCode'
		}, {
			fieldLabel: 'ECO描述',
			name: 'ecoDescription'
		}, {
			fieldLabel: 'ECR编码',
			name: 'ecrCode'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修信息判断种类',
			name: 'serviceDetermineTypeCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-determine-type/list'
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