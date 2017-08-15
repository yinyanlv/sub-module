Ext.define('App.view.common.window.UploadImportFile', {
	extend: 'App.view.common.window.UploadFile',
	title: '导入数据',
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
	uploadUrl: null,
	tplUrl: null,
	items: [{
		xtype: 'form',
		bodyPadding: 10,
		layout: 'hbox',
		items: [{
			allowBlank: false,
			xtype: 'filefield',
			labelWidth: 70,
			fieldLabel: '选择文件',
			buttonText: '浏览',
			width: 310,
			name: 'file',
			margin: '0 10 0 0',
			msgTarget: 'under',
			regex: /\.(xls)$|\.(xlsx)$/i,
			regexText: '上传文件后缀必须是(xls、xlsx)'
		}, {
			itemId: 'download-tpl',
			xtype: 'linkbutton',
			text: '模板.xlsx',
			title: '模板.xlsx',
			stopEvent: false,
			style: 'line-height:26px;'
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
			text: '导入'
		}, {
			xtype: 'button',
			itemId: 'cancel',
			text: '取消'
		}]
	}],

	constructor: function(config) {
		var me = this;

		this.url = config.uploadUrl;
		this.items[0].items[1].path = config.tplUrl;

		this.callParent(arguments);
	}
});