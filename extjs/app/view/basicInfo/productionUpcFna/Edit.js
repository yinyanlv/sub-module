Ext.define('App.view.basicInfo.productionUpcFna.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '编辑产品FNA与售后FNA关系',
	updateDisableItems: ['code'],
	items: [{
		items: [{
			fieldLabel: '产品FNA',
			name: 'code'
		}, {
			fieldLabel: '产品功能名称位置中文描述',
			name: 'noteZh',
			disabled: true
		}, {
			fieldLabel: '产品功能名称位置英文描述',
			name: 'noteEn',
			disabled: true
		}, {
			allowBlank: false,
			xtype: 'selectorfield',
			fieldLabel: '售后FNA',
			name: 'scode',
			editable: false,
			enableKeyEvents: true,
			allowBlank: true,
			windowTitle: '选择售后FNA',
			searchInputConfig: {
				flex: 1,
				labelPad: 10,
				labelWidth: 120,
				fieldLabel: '售后FNA',
				toUppercase: true
			},
			readUrl: App.globalConfig.path + '/supcfna/page',
			fields: [{
				name: 'code',
				mapping: 'scode'
			}, {
				name: 'noteZh',
				mapping: 'snoteZh'
			}, {
				name: 'noteEn',
				mapping: 'snoteEn'
			}],
			paramFields: ['code'],
			columns: [{
				text: "序号",
				xtype: 'rownumberer',
				align: 'center',
				width: 60
			}, {
				text: '售后FNA',
				dataIndex: 'code',
				width: 150
			}, {
				text: '售后功能名称位置中文描述',
				dataIndex: 'noteZh',
				flex: 1
			}, {
				text: '售后功能名称位置英文描述',
				dataIndex: 'noteEn',
				flex: 1
			}]
		}, {
			fieldLabel: '售后功能名称位置中文描述',
			name: 'snoteZh',
			disabled: true,
			allowBlank: true
		}, {
			fieldLabel: '售后功能名称位置英文描述',
			name: 'snoteEn',
			disabled: true,
			allowBlank: true
		}]
	}]
});