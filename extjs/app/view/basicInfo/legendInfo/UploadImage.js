Ext.define('App.view.basicInfo.legendInfo.UploadImage', {
	extend: 'Ext.window.Window',
	title: '选择图片',
	requires: [
		'Ext.ux.plugin.LabelRequired',
		'Ext.ux.component.combo.BaseCombo'
	],
	plugins: ['formlabelrequired'],
	closable: true,
	modal: true,
	resizable: false,
	constrainHeader: true,
	layout: 'fit',
	closeAction: 'destroy',
	width: 400,
	height: 135,
	url: null,

	initComponent: function() {
		var me = this;

		me.callParent(arguments);
	},

	initEvents: function() {
		var me = this,
			btnUpload = me.down('[itemId=upload]'),
			btnCancel = me.down('[itemId=cancel]');

		btnUpload.on('click', function() {
			me.doUpload();
		});

		btnCancel.on('click', function() {
			me.doCancel();
		});
	},

	doUpload: function() {
		var me = this,
			form = me.down('form').getForm();

		if (form.isValid()) {

			me.setLoading(true);
			form.submit({
				url:  App.globalConfig.path + '/photo-tmp-file/save',
				params: me.params,
				method: 'POST',
				callback: function () {
					me.setLoading(false);
				},
				success: function(that, action) {
					var root = Ext.decode(action.response.responseText);

					me.uploadSuccess(root.result);
				},
				failure: function(that, action) {
					var root = Ext.decode(action.response.responseText);

					me.uploadFailure(root);
				}
			});
		}
	},

	uploadSuccess: function(result) {
		var me = this;

		me.fireEvent('uploadsuccess', result);
		me.doCancel();
	},

	uploadFailure: function(result) {
		var me = this;

		me.fireEvent('uploadFailure', result);
	},

	doCancel: function() {
		var me = this;

		me.close();
	},
	items: [{
		xtype: 'form',
		bodyPadding: 10,
		items: [{
			xtype: 'filefield',
			fieldLabel: '图例文件',
			name: 'file',
			buttonText: '浏览',
			anchor: '100%',
			msgTarget: 'under',
			allowBlank: false,
			regex: /\.(svg)$/i,
			regexText: '上传的文件必须是svg图',
			maxLength: 200
		}]
	}],
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		defaults: {
			margins: '0 10 0 10'
		},
		layout: {
			align: 'middle',
			pack: 'center',
			type: 'hbox'
		},
		items: [{
			xtype: 'button',
			itemId: 'upload',
			text: '确定'
		}, {
			xtype: 'button',
			itemId: 'cancel',
			text: '取消'
		}]
	}]
});