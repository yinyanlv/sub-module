Ext.define('App.controller.partEngineering.Electrophoresis', {
	extend: 'Ext.ux.controller.CRUD',
	controllerReady: function() {
		var me = this;

		me.bindEvents();
	},

	bindEvents: function() {
		var me = this,
			grid = me.getGrid();

		grid.on('toolbarclick', function(that) {
			var action = that.action;

			switch (action) {
				case 'electrophoresis-edit':
					var record = me.getGridSelection()[0];

					me.openEditPage(record);
					break;
				default:
					break;
			}
		});
	},

	openEditPage: function(record) {
		var me = this,
			code = record.get('code'),
			url = App.globalConfig.path + '/electrophoresis/edit-page/' + code;

		window.open(url, '_target');
	}
});