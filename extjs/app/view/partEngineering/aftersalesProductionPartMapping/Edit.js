Ext.define('App.view.partEngineering.aftersalesProductionPartMapping.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '售后件生产件对应关系',
	updateDisableItems: ['afterSalesPartCode'],
	updateDisplayItems: ['deletedCode'],
	createNoSubmitFields: ['deletedCode'],
	items: [{
		items: [{
			fieldLabel: '售后件编码',
			name: 'afterSalesPartCode',
			allowBlank: false,
			xtype: 'selectorfield',
			editable: false,
			windowTitle: '选择配件',
			searchInputConfig: {
				flex: 1,
				labelPad: 10,
				labelWidth: 100,
				fieldLabel: '配件编码或名称',
				toUppercase: true
			},
			readUrl: App.globalConfig.path + '/part/basic-info-page',
			fields: [{
				name: 'code',
				mapping: 'afterSalesPartCode'
			}, {
				name: 'nameZh',
				mapping: 'afterSalesPartNameZh'
			}, {
				name: 'nameEn',
				mapping: 'afterSalesPartNameEn'
			}],
			paramFields: ['codeOrName'],
			columns: [{
				text: "序号",
				xtype: 'rownumberer',
				align: 'center',
				width: 60
			}, {
				text: '配件编码',
				dataIndex: 'code',
				flex: 1
			}, {
				text: '配件中文名称',
				dataIndex: 'nameZh',
				flex: 1
			}, {
				text: '配件英文名称',
				dataIndex: 'nameEn',
				flex: 1
			}]
		}, {
			xtype: 'displayfield',
			fieldLabel: '售后件中文名称',
			name: 'afterSalesPartNameZh',
			allowBlank: true
		}, {
			xtype: 'displayfield',
			fieldLabel: '售后件英文名称',
			name: 'afterSalesPartNameEn',
			allowBlank: true
		}, {
			xtype: 'numberfield',
			fieldLabel: '售后件用量',
			name: 'afterSalesQty',
			maxValue: 10000,
			minValue: 0.1
		}, {
			fieldLabel: '生产件编码',
			name: 'referPartCode',
			allowBlank: false,
			xtype: 'selectorfield',
			editable: false,
			windowTitle: '选择配件',
			searchInputConfig: {
				flex: 1,
				labelPad: 10,
				labelWidth: 100,
				fieldLabel: '配件编码或名称',
				toUppercase: true
			},
			readUrl: App.globalConfig.path + '/part/basic-info-page',
			fields: [{
				name: 'code',
				mapping: 'referPartCode'
			}, {
				name: 'nameZh',
				mapping: 'referPartNameZh'
			}, {
				name: 'nameEn',
				mapping: 'referPartNameEn'
			}],
			paramFields: ['codeOrName'],
			columns: [{
				text: "序号",
				xtype: 'rownumberer',
				align: 'center',
				width: 60
			}, {
				text: '配件编码',
				dataIndex: 'code',
				flex: 1
			}, {
				text: '配件中文名称',
				dataIndex: 'nameZh',
				flex: 1
			}, {
				text: '配件英文名称',
				dataIndex: 'nameEn',
				flex: 1
			}]
		}, {
			xtype: 'displayfield',
			fieldLabel: '生产件中文名称',
			name: 'referPartNameZh',
			allowBlank: true
		}, {
			xtype: 'displayfield',
			fieldLabel: '生产件英文名称',
			name: 'referPartNameEn',
			allowBlank: true
		}, {
			xtype: 'basecombo',
			fieldLabel: '删除标识',
			name: 'deletedCode',
			value: 0,
			hidden: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=deleted'
		}, {
			xtype: 'hiddenfield',
			name: 'id'
		}]
	}]
});