Ext.define('App.view.legendCatalog.legendTaskDetail.Viewport', {
    extend: 'Ext.ux.component.viewport.Base',
    requires: [
        'App.view.legendCatalog.legendTaskDetail.Query',
        'App.view.legendCatalog.legendTaskDetail.Grid',
        'App.view.legendCatalog.legendTaskDetail.AttachLegend',
        'App.view.legendCatalog.legendTaskDetail.AssignHistory',
        'App.view.legendCatalog.legendTaskDetail.TabPanel'
    ],
    height: '100%',
    items: [{
        region: 'north',
        xtype: 'legendtaskdetailquery',
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
            xtype: 'legendtaskdetailgrid',
            flex: 1
        }, {
            xtype: 'legendtaskdetailtabpanel',
            width: 400
        }]
    }]
});