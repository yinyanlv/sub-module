Ext.define('App.controller.partEngineering.StructConfirmTask', {
	extend: 'Ext.ux.controller.CRUD',
	controllerReady: function() {
		var me = this;
		me.bindEvents();
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
						page: 'StructConfirmTask'
					})
				}
			}
		})
	}
});