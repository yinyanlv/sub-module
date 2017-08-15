Ext.define('App.view.basicInfo.model.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.modelquery',
	items: [{
		items: [{
			fieldLabel: '车型编码',
			name: 'code'
		}, {
			fieldLabel: '车型名称',
			name: 'name'
		}, {
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			withAll: true,
			value: '',
			clearFields: ['seriesCode'],
			url: App.globalConfig.path + '/combo/brand/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '车系',
			name: 'seriesCode',
			withAll: true,
			value: '',
			dependFields: ['brandCode'],
			url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
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