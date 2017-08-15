Ext.define('App.view.legendCatalog.legendPartRelation.Query', {
    extend: 'Ext.ux.component.filter.Query',
    alias: 'widget.legendpartrelationquery',
    items: [{
        items: [ {
            allowBlank: false,
            xtype: 'basecombo',
            fieldLabel: '品牌',
            name: 'brandCode',
            withAll: false,
            storeAutoLoad: false,
            clearFields: ['seriesCode'],
            url: App.globalConfig.path + '/combo/brand/list'
        }, {
            allowBlank: false,
            xtype: 'basecombo',
            fieldLabel: '车系',
            name: 'seriesCode',
            withAll: false,
            dependFields: ['brandCode'],
            storeAutoLoad: false,
            url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
        }, {
            allowBlank: false,
            xtype: 'textfield',
            fieldLabel: '图例编码:',
            name: 'legendCode',
            value:'ES8-01001'
        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        border: true,
        layout: {
            align: 'middle',
            pack: 'center',
            type: 'hbox'
        },
        height: 'auto',
        style: 'padding-bottom: 5px;padding-top: 5px;',
        defaults: {
            width: 80
        },
        items: [{
            xtype: 'button',
            action: "query",
            text: "查询"
        },{
            xtype: 'button',
            action: "reset",
            text: "重置"
        }]
    }]
});