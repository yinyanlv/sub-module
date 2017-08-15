Ext.define('App.store.common.LegendGroup', {
    extend: 'Ext.data.TreeStore',
    model: 'App.model.common.LegendGroup',
    proxy: {
        type: 'ajax',
        url: App.globalConfig.path + '/legend-group/select',
        reader: {
            type: 'json'
        }
    }
});