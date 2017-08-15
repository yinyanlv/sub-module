Ext.define('App.view.partEngineering.actStruct.UpcfnaEdit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '修改产品FNA',

	doSave: function() {
		if (!this.getForm().isValid()) return;

		var me = this,
			params = me.getSaveParams();

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/act/update-pupcfna',
			method: 'post',
			jsonData: params,
			beforerequest: function() {
				me.setLoading('提示', '保存中...');
			},
			callback: function() {
				me.setLoading(false);
			},
			success: function() {
				me.fireEvent('savefinished');
				Ext.Msg.alert('提示', '保存成功');
				me.close();
			}
		});
	},

	getSaveParams: function() {
		var me = this,
			params = me.getParams();

		return {
			newUpcfnaCode: params.newUpcfnaCode,
			oldUpcfnaCode: params.productUpcfnaCode,
			partCode: params.partCode
		};
	},

	items: [{
		defaults: {
			xtype: "displayfield",
			margin: '0 0 5 0',
			labelWidth: 150,
			labelPad: 10,
			maxLength: 50,
			allowBlank: true
		},
		items: [{
			xtype: 'displayfield',
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			xtype: 'displayfield',
			fieldLabel: '配件英文名称',
			name: 'partNameEn'
		}, {
			xtype: 'displayfield',
			fieldLabel: '配件中文名称',
			name: 'partNameZh'
		}, {
			xtype: 'displayfield',
			fieldLabel: '修改前产品FNA',
			name: 'productUpcfnaCode'
		}, {
			xtype: 'displayfield',
			fieldLabel: '修改前功能地址中文描述',
			name: 'productUpcfnaNoteZh'
		}, {
			xtype: 'displayfield',
			fieldLabel: '修改前功能地址英文描述',
			name: 'productUpcfnaNoteEn'
		}, {
			xtype: 'selectorfield',
			fieldLabel: '修改后产品FNA',
			name: 'newUpcfnaCode',
			editable: false,
			enableKeyEvents: true,
			allowBlank: false,
			windowTitle: '选择产品FNA',
			searchInputConfig: {
				flex: 1,
				labelPad: 10,
				labelWidth: 120,
				fieldLabel: '产品FNA',
				toUppercase: true
			},
			readUrl: App.globalConfig.path + '/pupcfna/page',
			fields: [{
				name: 'code',
				mapping: 'newUpcfnaCode'
			}, {
				name: 'noteZh',
				mapping: 'newUpcfnaDescCN'
			}, {
				name: 'noteEn',
				mapping: 'newUpcfnaDescEN'
			}],
			paramFields: ['code'],
			columns: [{
				text: "序号",
				xtype: 'rownumberer',
				align: 'center',
				width: 60
			}, {
				text: '产品FNA',
				dataIndex: 'code',
				width: 150
			}, {
				text: '产品配件功能地址中文描述',
				dataIndex: 'noteZh',
				flex: 1
			}, {
				text: '产品配件功能地址英文描述',
				dataIndex: 'noteEn',
				flex: 1
			}]
		}, {
			xtype: 'displayfield',
			fieldLabel: '修改后功能地址中文描述',
			name: 'newUpcfnaDescCN'
		}, {
			xtype: 'displayfield',
			fieldLabel: '修改后功能地址英文描述',
			name: 'newUpcfnaDescEN'
		}]
	}]
});