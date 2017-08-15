Ext.define('App.controller.legendCatalog.LegendUsage', {
	extend: 'Ext.ux.controller.CRUD',
	controllerReady: function () {
		var me = this;

		me.bindEvents();
	},

	bindEvents: function () {
		var me = this,
			grid = me.getGrid();

		grid.on('toolbarclick', function (that) {
			var action = that.action;

			if (action === 'import') {
				me.openImportDialog();
			}
		});
	},

	openImportDialog: function () {
		var me = this,
			dialog = Ext.create('App.view.common.window.UploadImportFile', {
				title: '导入图例用法',
				autoShow: true,
				uploadUrl: App.globalConfig.path + '/legend-usage-manage/import-excel',
				tplUrl: App.globalConfig.resPrefix + '/template/图例用法管理-导入模板.xlsx'
			});

		dialog.on('uploadsuccess', function (result) {
			Ext.Msg.alert('提示', '导入成功');

			me.readRecord();
		});
	}
});