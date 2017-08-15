Ext.define('App.view.basicInfo.servicePaddingType.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '新增维修信息判断类型',
	updateDisableItems: ['code'],
	items: [{
		items: [{
      fieldLabel: '类型编码',
      name: 'code',
      maxLength: 50
    }, {
      fieldLabel: '类型名称',
      name: 'name',
      maxLength: 200
    }]
	}]
});