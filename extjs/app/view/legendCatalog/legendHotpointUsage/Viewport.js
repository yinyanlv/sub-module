Ext.define('App.view.legendCatalog.legendHotpointUsage.Viewport', {
    extend: 'Ext.ux.component.viewport.Base',
    requires: [
        'App.view.legendCatalog.legendHotpointUsage.Query',
        'App.view.legendCatalog.legendHotpointUsage.Grid'
    ],

    items: [{
        region: 'north',
        xtype: 'legendhotpointusagequery',
        overflowX: 'auto',
        width: '100%',
        minHeight: 70,
        split: true
    }, {
        region: 'center',
        xtype: 'legendhotpointusagegrid'
    }]
});