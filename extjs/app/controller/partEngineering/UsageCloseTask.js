Ext.define('App.controller.partEngineering.UsageCloseTask', {
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
				var code = recoder.get('partCode');

				if (e.getTarget('[data-action=pegging]')) {
					mainController.loadPage('416', {
						params: code
					});
				}
			}
		})
	}
});