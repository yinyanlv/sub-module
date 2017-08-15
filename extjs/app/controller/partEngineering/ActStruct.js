Ext.define('App.controller.partEngineering.ActStruct', {
	extend: 'Ext.ux.controller.Base',
	viewportReady: function() {
		var me = this,
			params = me.viewport.params;

		me.createExportForm();
		me.bindEvents();

		if (params) {
			me.autoLoad(params)
		}
	},

	bindEvents: function() {
		var me = this,
			tabs = Ext.getCmp('tabs'),
			grid = me.viewport.down('[itemId=grid]'),
			query = me.viewport.down('[itemId=query]'),
			subQuery = me.viewport.down('[itemId=subQuery]'),
			btnSubQuery = subQuery.down('[action=query]'),
			btnSubReset = subQuery.down('[action=reset]');

		query.on('queryRecord', function(params) {
			me.doQuery();
			me.clearSubQuery();
		});

		grid.on('reload', function() {

			me.doQuery();
		});

		grid.on('updateupcfna', function() {
			var records = this.getSelectionModel().getSelection();

			if (records.length) {
				me.openUpcfnaDialog(records[0]);
			}
		});

		grid.on('export', function() {

			me.doExport();
		});

		btnSubQuery.on('click', function() {

			me.doSubQuery();
		});

		btnSubReset.on('click', function() {

			me.clearSubQuery();
		});

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
		if (!params.partCode) return;

		var me = this,
			query = me.viewport.down('[itemId=query]'),
			tbPartCode = query.down("[name=partCode]");

		tbPartCode.setValue(params.partCode);
		query.loadPartName(params.partCode);
		query.loadUpcFna(params.upcfnaCode, function() {
			me.doQuery();
		});
	},

	doQuery: function() {
		var me = this,
			query = me.viewport.down('[itemId=query]'),
			params = query.getFilters();

		me.lastQueryParams = params;
		me.loadRemoteActStructData(params);
	},

	doSubQuery: function() {
		var me = this,
			params = me.getSubQueryParams(),
			query = me.viewport.down('[itemId=query]');

		if (query.isValid()) {
			me.lastQueryParams = params;
			me.loadRemoteActStructData(params);
		}
	},

	doExport: function() {
		var me = this,
			query = me.viewport.down('[itemId=query]'),
			url = App.globalConfig.path + '/act/export-act',
			exportParams = me.getExportParams();

		if (query.isValid()) {
			me.exportForm.submit({
				url: url,
				method: 'GET',
				params: {
					"args": Ext.encode(exportParams)
				},
				standardSubmit: true
			});
		}
	},

	getExportParams: function() {
		var me = this,
			filters = me.viewport.down('[itemId=query]').getFilters();

		return {
			filters: me.lastQueryParams || filters,
			sorts: [],
			paging: {
				page: 1,
				size: 100000
			}
		}
	},

	openUpcfnaDialog: function(record) {
		var me = this,
			dialog = Ext.create('App.view.partEngineering.actStruct.UpcfnaEdit', {
				autoShow: true
			});

		dialog.setRecord(record);

		dialog.on('savefinished', function() {
			me.doQuery();
		});
	},

	getSubQueryParams: function() {
		var me = this,
			params = [],
			subQuery = me.viewport.down('[itemId=subQuery]'),
			filters = me.viewport.down('[itemId=query]').getFilters(),
			values = subQuery.getForm().getValues();

		for (var key in values) {
			if (!Ext.isEmpty(values[key])) {
				params.push({
					name: key,
					value: values[key]
				});
			}
		}

		return params.concat(filters);
	},

	clearSubQuery: function() {
		var me = this,
			subQuery = me.viewport.down('[itemId=subQuery]');

		subQuery.reset();
	},

	loadRemoteActStructData: function(params) {
		var me = this,
			grid = me.viewport.down('[itemId=grid]'),
			store = grid.getStore(),
			args = {
				"filters": params,
				"sorts": [],
				"paging": {
					"page": 1,
					"size": 1000
				}
			};

		store.load({
			params: {
				args: Ext.encode(args)
			}
		});
	}
});