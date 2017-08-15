Ext.define('App.view.basicInfo.servicePolicyChange.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '维修策略变更理由',
	updateDisableItems: ['code'],
	items: [{
    items: [{
      fieldLabel: '维修策略变更理由编码',
      name: 'code',
      maxLength: 50
    }, {
      fieldLabel: '维修策略变更理由名称',
      name: 'name',
      maxLength: 200
    }]
  }]
});