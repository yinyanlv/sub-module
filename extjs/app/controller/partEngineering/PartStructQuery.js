Ext.define('App.controller.partEngineering.PartStructQuery', {
    extend: 'Ext.ux.controller.CRUD',
    controllerReady: function() {
        var me = this,
            params = me.viewport.params;

        me.bindEvents();

        if (params) {
            me.autoLoad(params.params)
        }
    },
    bindEvents: function() {
        var me = this,
            grid = me.getGrid(),
            mainController = me.getMainController();

        grid.on({
            'cellclick': function(view, cell, cellIndex, recoder, row, rowIndex, e) {
                var code = recoder.get('parentPartCode');

                if (e.getTarget('[data-action=pegging]')) {
                    mainController.loadPage('415', {
                        partCode: code,
                        page: 'PartStructQuery'
                    })
                }
            }
        })
    },
    autoLoad: function(params) {
        if (!params) return;

        var me = this,
            args,
            query = me.getQuery(),
            items = query.down("[name=partCode]");

        items.setValue(params);

        query.doQuery();
    }
});