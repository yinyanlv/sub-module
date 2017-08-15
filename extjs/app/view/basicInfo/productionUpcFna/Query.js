Ext.define('App.view.basicInfo.productionUpcFna.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.productionupcfnaquery',
	items: [{
		items: [{
			fieldLabel: '产品FNA',
			name: 'code'
		}, {
			fieldLabel: '产品功能地址描述',
			name: 'note'
		}, {
			fieldLabel: '售后FNA',
			name: 'scode'
		}, {
			fieldLabel: '售后功能地址描述',
			name: 'snote'
		}, {
			xtype: 'basecombo',
			fieldLabel: '售后FNA是否为空',
			name: 'scodeFlag',
			value: '',
			withAll: true,
			labelWidth: 130,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_null'
		}, {
			fieldLabel: '修改人',
			labelWidth: 50,
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