Ext.define('App.view.basicInfo.rpo.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.rpoquery',
	items: [{
		items: [{
			fieldLabel: 'OptionCode',
			name: 'code'
		}, {
			fieldLabel: '配置描述',
			name: 'note'
		}, {
			fieldLabel: 'FamilyCode',
			name: 'familyCode'
		}, {
			fieldLabel: 'Family描述',
			name: 'familyNote'
		}]
	}]
});