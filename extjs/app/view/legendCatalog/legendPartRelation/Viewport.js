Ext.define('App.view.legendCatalog.legendPartRelation.Viewport', {
    extend: 'Ext.ux.component.viewport.Base',
    requires: [
        'App.view.legendCatalog.legendPartRelation.Query',
        'App.view.legendCatalog.legendPartRelation.Grid',
        'App.view.legendCatalog.legendPartRelation.AddUsage',
        'App.view.legendCatalog.legendPartRelation.Legend',
        'App.view.legendCatalog.legendPartRelation.LegendInfo'
    ],
    height: '100%',
    items: [{
        region: 'north',
        xtype: 'legendpartrelationquery',
        overflowX: 'auto',
        width: '100%',
        minHeight: 70,
        split: true
    }, {
        width: '100%',
        flex: 1,
        layout: 'hbox',
        defaults: {
            height: '100%'
        },
        items: [{
            xtype: 'legendpartrelationlegend',
            width: 450
        }, {
            flex: 1,
            layout: 'vbox',
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'legendpartrelationlegendinfo',
                itemId: 'legendInfo',
                margin: '0 0 5 0'
            }, {
                xtype: 'legendpartrelationgrid',
                flex: 1
            }]
        }]
    }]
});