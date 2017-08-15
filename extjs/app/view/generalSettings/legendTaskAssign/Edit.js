Ext.define('App.view.generalSettings.legendTaskAssign.Edit', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '图例任务分配',
    updateDisableItems: ['brandCode', 'seriesCode', 'legendGroupCode'],
    items: [{
        items: [{
            allowBlank: true,
            xtype: 'basecombo',
            fieldLabel: '品牌',
            name: 'brandCode',
            url: App.globalConfig.path + '/combo/brand/list',
            clearFields: ['seriesCode']
        }, {
            allowBlank: true,
            xtype: 'basecombo',
            fieldLabel: '车系',
            name: 'seriesCode',
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
            withAll: false,
            url: App.globalConfig.path + '/combo/user/list?type=SPL'
        }]
    }]
});