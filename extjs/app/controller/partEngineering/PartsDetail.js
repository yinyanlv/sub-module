Ext.define('App.controller.partEngineering.PartsDetail', {
	extend: 'Ext.ux.controller.Base',
	views: ['partEngineering.partsDetail.Viewport'],
	viewportId: 'partsdetailviewport',

	viewportReady: function() {
		var me = this;

		me.bindEvents();
		me.loadRemoteData();
	},

	bindEvents: function() {
		var me = this,
			btnSave = me.viewport.down('[itemId=save]');

		btnSave.on('click', function() {
			me.doSave();
		});
	},

	loadRemoteData: function() {
		var me = this,
			partCode = App.pageConfig.partCode;

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/part/detail',
			method: 'GET',
			disableCaching: true,
			params: {
				partCode: partCode
			},
			beforerequest: function() {
				me.viewport.setLoading(true);
			},
			callback: function() {
				me.viewport.setLoading(false);
			},
			success: function(root) {
				me.bindFormData(root.result);
			}
		});
	},

	bindFormData: function(result) {
		var me = this,
			form = me.viewport.down('form').getForm();

		form.setValues(result);
	},

	doSave: function() {
		var me = this,
			params = me.getSaveParams(),
			form = me.viewport.down('form').getForm();

		if (!form.isValid()) {
			Ext.Msg.alert('提示', '输入的编辑内容有误，请检查');
			return;
		};

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/part/edit',
			method: 'PUT',
			jsonData: params,
			beforerequest: function() {
				me.viewport.setLoading('保存中...');
			},
			callback: function() {
				me.viewport.setLoading(false);
			},
			success: function() {
				Ext.Msg.alert('提示', '保存成功');
				me.loadRemoteData();
			}
		});
	},

	getSaveParams: function() {
		var me = this,
			params = {},
			form = me.viewport.down('form').getForm(),
			items = me.viewport.query('[readOnly=false]'),
			partCode = form.findField('code').getValue();

		params['code'] = partCode;

		Ext.each(items, function(item) {
			var rawVal = item.getRawValue();

			if (['onlineDate', 'offlineDate'].indexOf(item.name) > -1) {
				params[item.name] = Ext.isEmpty(rawVal) ? null : new Date(rawVal);
			} else {
				params[item.name] = item.getValue();
			}
		});

		return params;
	}
});