Ext.define('App.controller.partEngineering.NewPartTaskDetail', {
	extend: 'Ext.ux.controller.Base',
	views: ['partEngineering.newPartTaskDetail.Viewport'],
	viewportId: 'newparttaskdetailviewport',

	viewportReady: function() {
		var me = this,
			grid = me.getGrid();

		me.bindEvents();
		grid.load();
	},

	bindEvents: function() {
		var me = this,
			grid = me.getGrid(),
			store = grid.getStore(),
			query = me.getQuery(),
			formPanel = me.getForm(),
			btnQuery = query.down('[itemId=query]'),
			btnReset = query.down('[itemId=reset]');

		btnQuery.on('click', function() {
			grid.load();
		});

		btnReset.on('click', function() {
			query.getForm().reset();
		});

		grid.on({
			'beforesave': function() {
				me.viewport.setLoading('保存中...');
			},
			'aftersave': function() {
				me.viewport.setLoading(false);
			},
			'rowclick': function(that, record, element, rowIndex, e, eOpts) {
				formPanel.load(record);
			},
			'selectionchange': function() {
				formPanel.clearForm();
			}
		})

		store.on('beforeload', function(store, operation, eOpts) {
			var params = me.getQueryParams();

			operation.setParams({
				args: Ext.encode(params)
			});
		});
	},

	getQueryParams: function() {
		var me = this,
			params = [],
			query = me.getQuery().getForm(),
			values = query.getValues();

		for (var key in values) {
			if (!Ext.isEmpty(values[key])) {
				params.push({
					name: key,
					value: values[key]
				});
			}
		}

		params.push({
			name: 'partCode',
			value: App.pageConfig.partCode
		});

		return {
			"filters": params
		};
	},

	getGrid: function() {
		var me = this,
			grid = me.viewport.down('[itemId=grid]');

		return grid;
	},

	getQuery: function() {
		var me = this,
			query = me.viewport.down('[itemId=query]');

		return query;
	},

	getForm: function() {
		var me = this,
			form = me.viewport.down('[itemId=form]');

		return form;
	}
});