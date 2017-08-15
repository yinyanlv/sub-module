Ext.define('App.view.legendCatalog.legendTaskDetail.Query', {
    extend: 'Ext.ux.component.filter.Query',
    alias: 'widget.legendtaskdetailquery',
    doQuery: function() {
        if (!this.isValid()) return;

        var me = this,
            filters = me.getFilters(),
            params = me.rebuildFilters(filters);

        me.fireEvent('queryRecord', filters);
        me.loadSpl(params);
        me.fireEvent('loadlegendinfo', params);
    },

    rebuildFilters: function (filters) {
        var me = this,
            params = {};

        for (var i = 0; i < filters.length; i++) {
            params[filters[i].name] = filters[i].value;
        }

        return params;
    },

    loadSpl: function (params) {
        var me = this;

        Ext.util.Common.ajax({
            method: 'GET',
            jsonData: params,
            url: App.globalConfig.path + '/legend-task-allocation/get-task-allocation-spl?seriesCode='+ params.seriesCode +'&legendGroupCode='+ params.legendGroupCode,
            success: function (res) {
                var splName = me.down('form').getForm().findField('splName');

                splName.setValue(res && res.result && res.result.splName || '');
            }
        });
    },

    items: [{
        items: [{
            allowBlank: false,
            xtype: 'basecombo',
            fieldLabel: '品牌',
            name: 'brandCode',
            withAll: false,
            clearFields: ['seriesCode'],
            url: App.globalConfig.path + '/combo/brand/list'
        }, {
            allowBlank: false,
            xtype: 'basecombo',
            fieldLabel: '车系',
            name: 'seriesCode',
            withAll: false,
            dependFields: ['brandCode'],
            url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
        }, {
            allowBlank: false,
            xtype: 'treecombo',
            fieldLabel: '图例分组',
            rootVisible: false,
            name: 'legendGroupCode',
            canSelectFolders: false,
            isAllExpand: true,
            store: Ext.create('App.store.common.LegendGroup')
        }, {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'SPL',
            name: 'splName'
        }, {
            xtype: 'basecombo',
            fieldLabel: '配图状态',
            name: 'legendTaskStatusCode',
            withAll: true,
            value: '',
            url: App.globalConfig.path + '/combo/legend-stask-status/list'
        }]
    }]
});