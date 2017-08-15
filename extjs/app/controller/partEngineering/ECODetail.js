Ext.define('App.controller.partEngineering.ECODetail', {
	extend: 'Ext.ux.controller.Base',
	views: ['partEngineering.ecoDetail.Viewport'],
	viewportId: 'ecodetailviewport',

	viewportReady: function() {
		var me = this;

		me.bindEvents();
		me.loadBasicInfoData();
		me.loadNewPartTaskList();
		me.loadOldPartTaskList();
		me.loadServiceInfo();
	},

	bindEvents: function() {
		var me = this,
			newPartTaskGrid = me.getNewPartTaskGrid(),
			newPartTaskStore = newPartTaskGrid.getStore(),
			oldPartTaskGrid = me.getOldPartTaskGrid(),
			oldPartTaskStore = oldPartTaskGrid.getStore(),
			newPartTaskForm = me.getNewPartTaskForm();

		newPartTaskGrid.on({
			'beforesave': function() {
				me.viewport.setLoading('保存中...');
			},
			'aftersave': function() {
				me.viewport.setLoading(false);
			},
			'rowclick': function(that, record, element, rowIndex, e, eOpts) {
				newPartTaskForm.load(record);
			}
		});

		oldPartTaskGrid.on({
			'beforesave': function() {
				me.viewport.setLoading('保存中...');
			},
			'aftersave': function() {
				me.viewport.setLoading(false);
			},
			'rowclick': function(that, record, element, rowIndex, e, eOpts) {
				oldPartTaskForm.load(record);
			}
		});

		newPartTaskStore.on('beforeload', function(store, operation, eOpts) {
			var params = me.getPartTaskParams();

			operation.setParams({
				args: Ext.encode(params)
			});
		});

		oldPartTaskStore.on('beforeload', function(store, operation, eOpts) {
			var params = me.getPartTaskParams();

			operation.setParams({
				args: Ext.encode(params)
			});
		});
	},

	loadBasicInfoData: function() {
		var me = this,
			code = App.pageConfig['ecoCode'],
			formPanel = me.viewport.down('[itemId=basic-info]');

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/eco/' + code,
			method: 'GET',
			disableCaching: true,
			beforerequest: function() {
				formPanel.setLoading('加载中...');
			},
			callback: function() {
				formPanel.setLoading(false);
			},
			success: function(root) {
				me.bindBasicInfoData(root.result || {});
			}
		});
	},

	loadNewPartTaskList: function() {
		var me = this,
			grid = me.getNewPartTaskGrid();

		grid.load();
	},

	loadOldPartTaskList: function() {
		var me = this,
			grid = me.getOldPartTaskGrid();

		grid.load();
	},

	loadServiceInfo: function() {
		var me = this,
			grid = me.viewport.down('[itemId=ecodetailserviceinfo-grid]');

		grid.load();
	},

	bindBasicInfoData: function(data) {
		var me = this,
			form = me.viewport.down('[itemId=basic-info]').getForm();

		form.setValues(data);
	},

	getPartTaskParams: function() {
		var me = this,
			code = App.pageConfig['ecoCode'];

		return {
			"filters": [{
				"name": "ecoCode",
				"value": code
			}]
		};
	},

	getNewPartTaskGrid: function() {
		var me = this,
			grid = me.viewport.down('[itemId=newparttask-grid]');

		return grid;
	},

	getOldPartTaskGrid: function() {
		var me = this,
			grid = me.viewport.down('[itemId=oldparttask-grid]');

		return grid;
	},

	getNewPartTaskForm: function() {
		var me = this,
			formPanel = me.viewport.down('[itemId=newparttask-form]');

		return formPanel;
	}
});