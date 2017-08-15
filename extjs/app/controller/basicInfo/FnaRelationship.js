Ext.define('App.controller.basicInfo.FnaRelationship', {
    extend: 'Ext.ux.controller.CRUD',
    controllerReady: function () {
        var me = this;

        me.bindEvents();
    },

    bindEvents: function () {
        var me = this,
            grid = me.getGrid();

        grid.on('cellclick', function (view, cell, cellIndex, record, row, rowIndex, e) {

            if (e.getTarget('[data-action=maintain]')) {
                me.openProductFna(record);
            }
        });
    },

    openProductFna: function (record) {
        var me = this,
            mainController = me.getMainController();

        mainController.loadPage('1030', {
            code: record.get('code')
        });
    }
});