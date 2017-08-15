Ext.define('App.controller.partEngineering.ElectrophoresisEdit', {
	extend: 'Ext.ux.controller.Base',
	views: ['partEngineering.electrophoresisEdit.Viewport'],
	viewportId: 'electrophoresiseditviewport',
	viewportReady: function() {
		var me = this;

		me.bindEvents();
		me.loadBasicInfo();
	},

	bindEvents: function() {
		var me = this,
			grid = me.getGrid(),
			btnSave = grid.down('[itemId=save]');

		btnSave.on('click', function() {
			me.doSave();
		});
	},

	doSave: function() {
		var me = this,
			params = me.getSaveParams();

		if (params.length === 0) {
			Ext.Msg.alert('提示', '未做修改，无需保存');
			return;
		}

		if (!me.validateSave()) {
			Ext.Msg.alert('提示', '输入项有误，请检查列表错误');
			return;
		}

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/electrophoresis/update',
			method: 'POST',
			jsonData: params,
			beforerequest: function() {
				me.viewport.setLoading(true);
			},
			callback: function() {
				me.viewport.setLoading(false);
			},
			success: function() {

				Ext.Msg.alert('提示', '保存成功');

				me.loadList();
			}
		});
	},

	validateSave: function() {
		var me = this,
			errorEls = me.getGrid().getEl().query('.x-grid-edit-cell-border-invalid');

		if (errorEls.length > 0) {
			return false;
		}

		return true;
	},

	getSaveParams: function() {
		var me = this,
			updateRecords = [],
			store = me.getGrid().getStore(),
			updateItems = store.getUpdatedRecords() || [];

		Ext.each(updateItems, function(item) {
			var record = {
				code: item.get('code'),
				nameZh: item.get('nameZh'),
				nameEn: item.get('nameEn'),
				note: item.get('note')
			};

			updateRecords.push(record);
		});

		return updateRecords;
	},

	loadBasicInfo: function() {
		var me = this,
			code = App.pageConfig.code;

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/electrophoresis/detail?code=' + code,
			method: 'GET',
			disableCaching: true,
			beforerequest: function() {
				me.viewport.setLoading(true);
			},
			callback: function() {
				me.viewport.setLoading(false);
			},
			success: function(root) {

				me.bindFormData((root && root[0]) || {});
			}
		});
	},

	bindFormData: function(result) {
		var me = this,
			form = me.viewport.down('form').getForm();

		form.setValues(result);
	},

	loadList: function() {
		var me = this,
			grid = me.getGrid(),
			store = grid.getStore();

		store.removeAll();
		store.load();
	},

	getGrid: function() {
		var me = this,
			grid = me.viewport.down('[itemId=grid]');

		return grid;
	}
});