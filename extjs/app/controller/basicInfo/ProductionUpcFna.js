Ext.define('App.controller.basicInfo.ProductionUpcFna', {
    extend: 'Ext.ux.controller.CRUD',
    viewportReady: function () {
        var me = this,
            params = me.viewport.params;

        me.createControl();
        me.initStoreEvent();
        me.createExportForm();

        if (Ext.isFunction(me.controllerReady)) {
            me.controllerReady.apply(me, []);
        }

        me.bindEvents();

        if (params) {
            me.autoLoad(params)
        }
    },

    bindEvents: function() {
        var me = this,
            tabs = Ext.getCmp('tabs');

        tabs.on('tabchange', function(tabPanel, newCard, oldCard, eOpts) {
            var params = newCard.params;

            if (newCard.id == 'tab_' + newCard.pid && params) {
                window.setTimeout(function() {
                    me.autoLoad(params);
                }, 200);
            }
        });
    },

    autoLoad: function(params) {
        if (!params.code) return;

        var me = this,
            queryForm = me.viewport.down('[itemId=query-form]'),
            productCode = queryForm.down("[name=code]");

        productCode.setValue(params.code);
        queryForm.doQuery();
    }
});