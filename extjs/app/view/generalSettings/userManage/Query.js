Ext.define('App.view.generalSettings.userManage.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.userquery',
	requires: ['Ext.ux.component.combo.BaseCombo'],
	items: [{
		items: [{
			fieldLabel: '用户编码',
			name: 'code'
		}, {
			fieldLabel: '用户名称',
			name: 'name'
		}, {
			xtype: 'basecombo',
			fieldLabel: '用户类型',
			name: 'typeCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/usertype/list'
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