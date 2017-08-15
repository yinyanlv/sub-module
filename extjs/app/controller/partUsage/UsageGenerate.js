Ext.define('App.controller.partUsage.UsageGenerate', {
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
				case 're-generate':
					me.openUsageGenerateDialog();
					break;
				case 'view-generate-record':
					me.viewGenerateRecord();
					break;
				default:
					break;
			}
		});
	},

	openUsageGenerateDialog: function() {
		var me = this,
			dialog = Ext.create('App.view.partUsage.usageGenerate.UsageGenerate', {
				autoShow: true
			});

		dialog.on('usagegenerate', function(params) {
			me.generateUsage(dialog, params);
		});
	},

	generateUsage: function(dialog, params) {
		var me = this;

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/usage/generate',
			method: 'POST',
			jsonData: params.seriesCode,
			timeout: 1000 * 60 * 15,
			callback: function() {
				dialog.setLoading(false);
			},
			success: function() {
				Ext.Msg.alert('提示', '用法生成成功');
				dialog.close();
				me.reloadRecord(params);
			}
		});
	},


	reloadRecord: function(params) {
		var me = this,
			query = me.getQuery(),
			queryForm = query.getForm(),
			brandStore = queryForm.findField('brandCode').getStore(),
			seriesStore = queryForm.findField('seriesCode').getStore();

		queryForm.setValues({
			brandCode: params.brandCode,
			seriesCode: params.seriesCode[0]
		});

		brandStore.load();
		seriesStore.load();

		query.doQuery();
	},

	viewGenerateRecord: function(record) {
		var me = this;

		me.dialog = Ext.create('Ext.window.Window', {
			width: 795,
			height: 520,
			modal: true,
			resizable: false,
			autoShow: true,
			title: '用法生成记录',
			layout: 'fit',
			items: [{
				xtype: 'generatehistory'
			}]
		});

		me.dialog.down('generatehistory').readRecord();
	}
});