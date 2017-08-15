Ext.define('App.view.partOperation.packageStandardInfo.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '包装规范信息管理',
	formSubmit: true,
	updateDisableItems: ['code'],
	updateDisplayItems: ['photoOriginalFilename'],
	itemId: 'edit',
	items: [{
		items: [{
			fieldLabel: '包装规范编码',
			name: 'code',
			maxLength: 50
		}, {
			xtype: 'textarea',
			fieldLabel: '包装规范描述',
			name: 'name',
			maxLength: 200
		}, {
			xtype: 'filefield',
			fieldLabel: '包装规范示意图',
			name: 'file',
			buttonText: '浏览',
			anchor: '100%',
			msgTarget:'under',
			allowBlank: true
		}, {
			xtype: 'displayfield',
			fieldLabel: '当前文件',
			name: 'photoOriginalFilename',
			allowBlank: true,
			value: '',
			renderer: function (val) {
				var me = this,
					params = me.up('[itemId=edit]').getParams();

				if (!val) {
					return;
				} else {
					return '<a href="'+ App.globalConfig.packageImgResPrefix + params.photoUltimatelyFilename + '" target="_blank">'+ val +'</a>';
				}

			},
			hidden: true
		}, {
			xtype: 'hidden',
			name: 'photoUltimatelyFilename'
		}]
	}]
});