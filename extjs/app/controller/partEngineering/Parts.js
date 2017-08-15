Ext.define('App.controller.partEngineering.Parts', {
	extend: 'Ext.ux.controller.CRUD',
	controllerReady: function() {
		var me = this;
		me.bindEvents();
	},
    bindEvents: function () {
        var me = this,
            grid = me.getGrid();

        grid.on('cellclick', function (view, cell, cellIndex, record, row, rowIndex, e) {
            if (e.getTarget('[data-action=act]')) {
                me.openStruct(record);
            }
        });
    },

	openStruct: function (record) {
        var me = this,
            mainController = me.getMainController();

        mainController.loadPage('415', {
        	partCode: record.get('code')
        });
    }
});