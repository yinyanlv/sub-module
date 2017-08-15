Ext.define('App.view.partUsage.usageGenerate.UsageGenerate', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '重新生成用法',
	updateDisableItems: [],
	items: [{
		items: [{
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			url: App.globalConfig.path + '/combo/brand/list',
			clearFields: ['seriesCode']
		}, {
			xtype: 'basecombo',
			fieldLabel: '车系',
			name: 'seriesCode',
			multiSelect: true,
			dependFields: ['brandCode'],
			url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
		}]
	}],
	doSave: function() {
		if (!this.getForm().isValid()) {
			return;
		}
		var me = this,
			params = me.getParams();

		me.setLoading('用法生成中...');
		me.fireEvent('usagegenerate', params);
	},
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		margin: "5 0 12 0",
		defaults: {
			width: 80
		},
		layout: {
			align: 'middle',
			pack: 'center',
			type: 'hbox'
		},
		items: [{
			xtype: 'button',
			action: "save",
			text: "生成"
		}, {
			xtype: 'button',
			action: "cancel",
			text: "取消"
		}]
	}]
});