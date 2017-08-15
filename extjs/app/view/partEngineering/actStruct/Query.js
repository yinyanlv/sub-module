Ext.define('App.view.partEngineering.actStruct.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.actstructquery',

	initEvents: function() {
		var me = this,
			tbPartCode = me.down('[name=partCode]');

		tbPartCode.on('blur', function() {
			me.resetUpcFna();
			var value = tbPartCode.getValue();

			if (!Ext.isEmpty(value)) {
				me.loadPartName(value);
				me.loadUpcFna();
			}
		});

		this.callParent(arguments);
	},

	loadPartName: function(value) {
		var me = this,
			tbPartCode = me.down('[name=partCode]'),
			nameCN = me.down('[name=nameCN]'),
			nameEN = me.down('[name=nameEN]');

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/part/basic-info-page',
			params: {
				args: Ext.encode({
					"filters": [{
						"name": "code",
						"value": value
					}],
					"sorts": [],
					"paging": {
						"page": 1,
						"size": 1
					}
				})
			},
			method: "GET",
			beforerequest: function() {
				me.setFieldLoading(tbPartCode, true);
			},
			callback: function() {
				me.setFieldLoading(tbPartCode, false);
			},
			success: function(result) {
				if (result.list.length) {
					nameCN.setValue(result.list[0].nameZh);
					nameEN.setValue(result.list[0].nameEn);
				}
			}
		});
	},

	setFieldLoading: function(field, disabled) {
		var me = this;

		if (disabled) {
			field.setDisabled(disabled);
			field.setEmptyText('加载中...');
		} else {
			field.setDisabled(disabled);
			field.setEmptyText('');
		}
	},

	resetUpcFna: function() {
		var me = this,
			cbUpcFnaCode = me.down('[name=upcfnaCode]'),
			nameCN = me.down('[name=nameCN]'),
			nameEN = me.down('[name=nameEN]');

		cbUpcFnaCode.clearValue();
		cbUpcFnaCode.clearInvalid();
		cbUpcFnaCode.setValue('');
		nameCN.setValue('');
		nameEN.setValue('');
	},

	loadUpcFna: function(selectUpcfng, callback) {
		var me = this,
			cbActUpcFnaCode = me.down('[name=upcfnaCode]'),
			store = cbActUpcFnaCode.getStore();

		me.setComboboxLoading(true);

		store.load(function() {
			if (store.getRange().length) {
				if (selectUpcfng) {
					cbActUpcFnaCode.setValue(selectUpcfng);
				} else {
					cbActUpcFnaCode.select(store.getAt(0));
				}
			} else {
				me.resetUpcFna();
			}
			if (Ext.isFunction(callback)) {
				callback();
			}
			me.setComboboxLoading(false);
		});
	},

	setComboboxLoading: function(loading) {
		var me = this,
			cbActUpcFnaCode = me.down('[name=upcfnaCode]');

		if (loading) {
			cbActUpcFnaCode.setValue('')
			cbActUpcFnaCode.setDisabled(true);
			cbActUpcFnaCode.setEmptyText('加载中...');
		} else {
			cbActUpcFnaCode.setDisabled(false);
			cbActUpcFnaCode.setEmptyText('');
		}
	},

	items: [{
		items: [{
			fieldLabel: '总成件编号',
			name: 'partCode',
			allowBlank: false,
			xtype: 'selectorfield',
			editable: true,
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
				mapping: 'partCode'
			}, {
				name: 'nameZh',
				mapping: 'nameCN'
			}, {
				name: 'nameEn',
				mapping: 'nameEN'
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
			fieldLabel: '总成件中文名称',
			width: 230,
			name: 'nameCN'
		}, {
			xtype: 'displayfield',
			fieldLabel: '总成件英文名称',
			width: 230,
			name: 'nameEN'
		}, {
			xtype: 'basecombo',
			fieldLabel: '产品FNA',
			name: 'upcfnaCode',
			dependFields: ['partCode'],
			url: App.globalConfig.path + '/combo/get-upcfnacodes-by-partcode/list?code={partCode}'
		}]
	}]
});