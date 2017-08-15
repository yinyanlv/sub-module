Ext.define('App.model.legendCatalog.LegendTaskDetail', {
    extend: 'App.model.common.Base',
    fields: [{
        name: 'callout'
    }, {
        name: 'endDate',
        mapping: function (data) {
            return Ext.util.Format.localDate(data[this.name]);
        }
    }, {
        name: 'fnaNameEn'
    }, {
        name: 'fnaNameZh'
    }, {
        name: 'legendCode'
    }, {
        name: 'legendGroupCode'
    }, {
        name: 'legendTaskStatusCode'
    }, {
        name: 'partCode'
    }, {
        name: 'partNameEn'
    }, {
        name: 'partNameZh'
    }, {
        name: 'qty'
    }, {
        name: 'recommendCallouts'
    }, {
        name: 'recommendLegendCodes'
    }, {
        name: 'rootPartCode'
    }, {
        name: 'rpoName'
    }, {
        name: 'seriesCode'
    }, {
        name: 'servicePolicyCode'
    }, {
        name: 'servicePolicyName'
    }, {
        name: 'splNote'
    }, {
        name: 'startDate',
        mapping: function (data) {
            return Ext.util.Format.localDate(data[this.name]);
        }
    }, {
        name: 'supcfnaCode'
    }, {
        name: 'usageCode'
    }, {
        name: 'usageNote'
    }]
});