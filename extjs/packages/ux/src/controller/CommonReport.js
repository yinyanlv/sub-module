Ext.define('Ext.ux.controller.CommonReport', {
	extend: 'Ext.ux.controller.CRUD',
	urls: {
		cmpConfig: App.globalConfig.path + '/report/{code}/meta',
		read: App.globalConfig.path + '/report/{code}/query',
		create: App.globalConfig.path + '/report/{code}/add',
		update: App.globalConfig.path + '/report/{code}/edit',
		destroy: App.globalConfig.path + '/report/{code}/delete',
		combox: App.globalConfig.path + '/common/select/options',
		exports: App.globalConfig.restpath + '/export/reporting/{code}'
	},

	viewportReady: function() {
		var me = this;

		me.initComponent();
	},

	initComponent: function() {
		var me = this,
			functionCode = me.functionCode;

		me.loadRemoteConfig(functionCode, function(result) {
			me.reportConfig = result || {};
			me.finishLoaded(result);
		});
	},

	loadRemoteConfig: function(functionCode, callback) {
		var me = this,
			url = me.urls.cmpConfig.replace('{code}', functionCode);

		Ext.util.Common.ajax({
			url: url,
			disableCaching: true,
			success: function(result) {
				callback(result);
			}
		});
	},

	finishLoaded: function(config) {
		var me = this,
			code = config.code,
			fields = config.fields,
			parameters = config.parameters,
			tasks = me.createTasks(parameters);

		me.loadSubParams(tasks, function(subParams) {
			var query = me.createQuery(parameters, subParams),
				grid = me.createGrid(fields, code);

			me.addToViewport(query, grid);
			me.bindEvents(query, grid);
			me.bindParentEvents();
		});
	},

	addToViewport: function(query, grid) {
		var me = this;

		me.viewport.add(query);
		me.viewport.add(grid);
	},

	bindEvents: function(query, grid) {
		var me = this,
			store = grid.getStore();

		grid.on('columnresize', function(ct, column, width, eOpts) {
			if (!column.isLocked) {
				column.isAutoSize = false;
			}
		});

		store.on('refresh', function(that, eOpts) {
			var columns = grid.getView().getHeaderCt().getGridColumns();

			Ext.each(columns, function(item) {
				if (item.isAutoSize && that.totalCount) {
					item.isLocked = true;
					item.autoSize();
					item.setWidth(Math.min(item.getWidth() + 20, 400));
					item.isLocked = false;
				}
			});
		});
	},

	bindParentEvents: function() {
		var me = this;

		me.createControl();
		me.initStoreEvent();
		me.createExportForm();
	},

	loadSubParams: function(tasks, callback) {
		var me = this;

		me.callTasks(tasks, 0, [], callback);
	},

	callTasks: function(tasks, i, results, callback) {
		var me = this;

		if (i < tasks.length) {
			tasks[i](function(result) {
				results.push(result);
				me.callTasks(tasks, ++i, results, callback);
			});
		} else {
			callback(results);
		}
	},

	createTasks: function(parameters) {
		var me = this,
			i = 0,
			taskFuns = [];

		for (; i < parameters.length; i++) {
			if (!parameters[i].subQueryCode) continue;

			taskFuns.push(function(param) {
				var code = param.subQueryCode;

				return function(callback) {
					Ext.util.ajax({
						url: me.urls.cmpConfig.replace('{code}', code),
						disableCaching: true,
						success: function(result) {
							callback(result);
						}
					});
				};

			}(parameters[i]));
		}

		return taskFuns;
	},

	createQuery: function(config, subParams) {
		var me = this,
			className = me.getViewClassPath() + '.Query',
			items = me.getQueryItem(config, subParams),
			query = Ext.create(className, {
				region: 'north',
				xtype: 'testquery',
				overflowX: 'auto',
				width: '100%',
				minHeight: 70,
				split: true,
				items: [{
					items: items
				}]
			});

		return query;
	},

	createGrid: function(config, code) {
		var me = this,
			className = me.getViewClassPath() + '.Grid',
			columns = me.getGridColumns(config, true),
			grid = Ext.create(className, {
				region: 'center',
				store: me.createStore(config, code),
				columns: columns
			});

		return grid;
	},

	createStore: function(config, code) {
		var me = this,
			className = me.$className.replace('.controller.', '.store.'),
			store = Ext.create(className, {
				fields: me.getFields(config),
				proxyAPI: {
					read: me.urls.read.replace('{code}', code),
					create: me.urls.create.replace('{code}', code),
					update: me.urls.update.replace('{code}', code),
					destroy: me.urls.destroy.replace('{code}', code)
				}
			});

		return store;
	},

	createEditWindow: function(editMode) {
		var me = this,
			className,
			name = me.reportConfig.name,
			editFields = me.reportConfig.editFields || [],
			editItems = me.getEditItems(me.reportConfig.editFields);

		if (Ext.isString(me.editView)) {
			className = me.editView;
		} else {
			className = me.getViewClassPath() + ".Edit";
		}

		me.editWindow = Ext.create(className, {
			title: name,
			editMode: editMode,
			items: [{
				items: editItems
			}]
		});
	},

	getFields: function(config) {
		var me = this,
			fields = [];

		Ext.each(config, function(item) {
			fields.push({
				name: item.name
			});
		});

		return fields;
	},

	getQueryItem: function(config, subParams) {
		var me = this,
			items = [];

		Ext.each(config, function(item) {

			switch (item.type) {
				case '01':
					var subQueryCode = item.subQueryCode;
					var subConfig = me.getSubSingleCfg(subParams, subQueryCode);

					items.push({
						xtype: me.XTYPE[item.type],
						fieldLabel: item.description,
						itemId: item.name,
						name: item.name,
						dialogTitle: subParams[0].name,
						readUrl: me.urls.readRecord.replace('{code}', subQueryCode),
						fields: me.getFields(subConfig.fields),
						columns: me.getGridColumns(subConfig.fields)
					});
					break;
				case '02':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						xtype: me.XTYPE[item.type]
					});
					break;
				case '03':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						xtype: me.XTYPE[item.type],
						minValue: 0
					});
					break;
				case '04':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						xtype: me.XTYPE[item.type],
						format: 'Y-m-d H:i:s'
					});
					break;
				case '05':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						xtype: me.XTYPE[item.type],
						format: 'Y-m-d'
					});
					break;
				case '06':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						xtype: me.XTYPE[item.type],
						url: App.globalConfig.path + item.url,
						withAll: true,
						value: ''
					});
					break;
				default:
					break;
			}
		});

		return items;
	},

	getGridColumns: function(config, isShowRN) {
		var me = this,
			columns = [],
			tm = new Ext.util.TextMetrics();

		if (isShowRN) {
			columns.push({
				text: "序号",
				xtype: 'rownumberer',
				width: 60,
				align: 'center'
			});
		}

		Ext.each(config, function(item) {
			var width = 120;

			if (item.name.indexOf('_') === 0) {
				return true;
			}

			switch (item.type) {
				case '01':
					columns.push({
						dataIndex: item.name,
						text: item.description,
						isAutoSize: true,
						width: width
					});
					break;
				case '02':
					columns.push({
						dataIndex: item.name,
						text: item.description,
						isAutoSize: true,
						width: width
					});
					break;
				case '03':
					columns.push({
						dataIndex: item.name,
						text: item.description,
						isAutoSize: true,
						width: width,
						renderer: function(val) {
							return Ext.util.Format.localDate(val);
						}
					});
					break;
				default:
					break;
			}
		});

		return columns;
	},

	getEditItems: function(config) {
		var me = this,
			items = [];

		Ext.each(config, function(item) {

			switch (item.type) {
				case '01':
					var subQueryCode = item.subQueryCode;
					var subConfig = me.getSubSingleCfg(subParams, subQueryCode);

					items.push({
						xtype: me.XTYPE[item.type],
						fieldLabel: item.description,
						itemId: item.name,
						name: item.name,
						dialogTitle: subParams[0].name,
						allowBlank: item.allowBlank,
						readUrl: me.urls.readRecord.replace('{code}', subQueryCode),
						fields: me.getFields(subConfig.fields),
						columns: me.getGridColumns(subConfig.fields)
					});
					break;
				case '02':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						allowBlank: item.allowBlank,
						xtype: me.XTYPE[item.type]
					});
					break;
				case '03':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						allowBlank: item.allowBlank,
						xtype: me.XTYPE[item.type],
						minValue: 0
					});
					break;
				case '04':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						allowBlank: item.allowBlank,
						xtype: me.XTYPE[item.type],
						format: 'Y-m-d H:i:s'
					});
					break;
				case '05':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						allowBlank: item.allowBlank,
						xtype: me.XTYPE[item.type],
						format: 'Y-m-d'
					});
					break;
				case '06':
					items.push({
						name: item.name,
						fieldLabel: item.description,
						xtype: me.XTYPE[item.type],
						allowBlank: item.allowBlank,
						url: App.globalConfig.path + item.url,
						value: ''
					});
					break;
				default:
					break;
			}
		});

		return items;
	},

	getSubSingleCfg: function(subConfig, code) {
		var me = this,
			i = 0;

		for (; i < subConfig.length; i++) {
			if (subConfig[i].code === code) {
				return subConfig[i];
			}
		}
	},

	XTYPE: {
		'01': 'superfield',
		'02': 'textfield',
		'03': 'numberfield',
		'04': 'datetimefield',
		'05': 'datefield',
		'06': 'basecombo'
	}
});