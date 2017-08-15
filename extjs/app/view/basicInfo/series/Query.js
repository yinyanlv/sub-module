Ext.define('App.view.basicInfo.series.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.seriesquery',
	items: [{
		items: [{
			fieldLabel: '车系编码',
			name: 'code'
		}, {
			fieldLabel: '车系名称',
			name: 'name'
		}, {
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/brand/list'
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