Ext.define('App.view.partOperation.partPurchaseInfo.Edit', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '配件包装信息维护',
    items: [{
        items: [{
            xtype: 'displayfield',
            fieldLabel: '配件编码',
            allowBlank: true,
            name: 'code'
        }, {
            xtype: 'displayfield',
            fieldLabel: '配件中文名称',
            name: 'nameZh',
            allowBlank: true
        }, {
            xtype: 'displayfield',
            fieldLabel: '配件英文名称',
            name: 'nameEn',
            allowBlank: true
        }, {
            xtype: 'basecombo',
            fieldLabel: '采购工程师',
            name: 'purchaseEngineerCode',
            allowBlank: true,
            storeAutoLoad: true,
            withAll: false,
            url: App.globalConfig.path + '/combo/user/list?type=SPP'
        }, {
            xtype: 'datefield',
            fieldLabel: '配件有效期',
            allowBlank: true,
            name: 'validityPeriod',
            format: 'Y-m-d'
        }]
    }]
});