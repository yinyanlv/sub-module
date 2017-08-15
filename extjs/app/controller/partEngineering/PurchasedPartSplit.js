Ext.define('App.controller.partEngineering.PurchasedPartSplit', {
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
				case 'batch-complete':
					me.batchComplete();
					break;
				default:
					break;
			}
		});

		grid.on('cellclick', function(view, cell, cellIndex, record, row, rowIndex, e) {
			if (e.getTarget('[data-action=part]')) {
				me.openPart(record);
			}
			if (e.getTarget('[data-action=detail]')) {
				me.openDetailPage(record);
			}
		});
	},

	openDetailPage: function(record) {
		var me = this,
			partCode = record.get('partCode'),
			url = App.globalConfig.path + '/new-part-task/detail-page/' + partCode;

		window.open(url, '_target');
	},

	openPart: function(record) {
		var me = this,
			partCode = record.get('partCode');

		// TODO
	}
});