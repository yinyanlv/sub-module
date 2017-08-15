Ext.define('App.view.generalSettings.legendTaskAssign.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.legendtaskassignquery',
	items: [{
		items: [{
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
			allowBlank: true,
			xtype: 'treecombo',
			fieldLabel: '图例分组',
			rootVisible: false,
			name: 'legendGroupCode',
			canSelectFolders: false,
			isAllExpand: true,
			store: Ext.create('App.store.common.LegendGroup')
		}, {
			fieldLabel: 'SPL',
			name: 'splCode',
			xtype: 'basecombo',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
		}, {
			fieldLabel: 'SPL是否为空',
			name: 'isSplBlank',
			xtype: 'basecombo',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box//list?type=is_spl_blank'
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