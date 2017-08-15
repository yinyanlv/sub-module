Ext.define('App.view.legendCatalog.legendUsage.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '图例用法',
	items: [{
		items: [{
			xtype: 'basecombo',
			fieldLabel: '品牌',
			name: 'brandCode',
			withAll: false,
			clearFields: ['seriesCode'],
			url: App.globalConfig.path + '/combo/brand/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '车系',
			name: 'seriesCode',
			withAll: false,
			dependFields: ['brandCode'],
			url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
		}, {
			fieldLabel: '图例编码',
			name: 'legendCode',
			xtype: 'selectorfield',
			editable: false,
			windowTitle: '选择图例编码',
			searchInputConfig: {
				flex: 1,
				labelPad: 10,
				labelWidth: 100,
				fieldLabel: '编码或名称',
				toUppercase: true
			},
			readUrl: App.globalConfig.path + '/legend-file/page',
			fields: [{
				name: 'code',
				mapping: 'legendCode'
			}, {
				name: 'nameZh'
			}, {
				name: 'nameEn'
			}, {
				name: 'legendStandardCode'
			}, {
				name: 'legendStandardNameZh'
			}, {
				name: 'legendStandardNameEn'
			}],
			paramFields: ['codeOrNameAndLegendStandardCodeOrName'],
			columns: [{
				text: "序号",
				xtype: 'rownumberer',
				align: 'center',
				width: 60
			}, {
				text: '图例编码',
				dataIndex: 'code',
				width: 140
			}, {
				text: '图例编码中文名称',
				dataIndex: 'nameZh',
				width: 160
			}, {
				text: '图例编码英文名称',
				dataIndex: 'nameEn',
				width: 160
			}, {
				text: '图例标准名称编码',
				dataIndex: 'legendStandardCode',
				width: 140
			}, {
				text: '图例标准中文名称',
				dataIndex: 'legendStandardNameZh',
				width: 160
			}, {
				text: '图例标准英文名称',
				dataIndex: 'legendStandardNameEn',
				width: 160
			}]
		}]
	}]
});