Ext.define('App.controller.basicInfo.LegendInfo', {
    extend: 'Ext.ux.controller.CRUD',
    viewportReady: function() {
        var me = this,
            params = me.viewport.params;

        this.callParent(arguments);

        me.bindEvents();

        if (params) {
            me.autoLoad(params)
        }
    },
    autoLoad: function(params) {
        if (!params.code) return;

        var me = this,
            query = me.getQuery();

        query.down('form').getForm().setValues(params);
        query.doQuery();
    },
    bindEvents: function () {
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
    }
});