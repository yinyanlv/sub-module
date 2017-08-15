Ext.define('Ext.ux.component.combo.BaseCombo', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.basecombo',
	displayField: 'name',
	valueField: 'code',
	allText: '全部',
	allValue: '',
	withAll: false,
	storeAutoLoad: true,
	queryParam: '',
	extraFields: [],
	editable: false,
	dependFields: null,
	clearFields: null,
	noCache: true,
	proxyType: 'ajax',
	queryCaching: false,
	displayFormat: null,
	rememberCombox: false,
	selectAllButton: false,

	constructor: function(config) {
		var me = this;

		if (config.rememberCombox) {
			config.editable = true;
			config.triggerCls = 'x-form-remember-trigger';
			config.autoSelect = false;
			config.forceSelection = false;
			config.minChars = 2000;
		}

		me.callParent(arguments);
	},

	initComponent: function() {
		var me = this;

		if (me.selectAllButton) {
			me.withAll = true;
		}
		if (Ext.isString(me.url)) {
			me.loadRemoteData();
		}
		if (Ext.isArray(me.localData)) {
			me.loadLocalData();
		}

		me.callParent(arguments);
	},

	initEvents: function() {
		var me = this,
			store = me.getStore(),
			picker = me.getPicker();

		this.callParent(arguments);

		if (me.clearFields !== null) {
			me.on('select', function() {
				me.clearTargetFields();
			});
		}

		if (me.selectAllButton) {
			me.on('change', function(that, newValue, oldValue, eOpts) {
				if (newValue.length === 0) {
					me.resetAllText();
				}
			});
			me.on('expand', function() {
				window.setTimeout(function() {
					picker.getScrollable().scrollTo(0, 0);
				}, 100);
			});
			picker.on('itemclick', function(picker, record) {
				if (['selectAll', 'unselectAll'].indexOf(record.get('code')) == -1) {
					return true;
				}
				me.selectAllOptions(picker, record);
				return false;
			});

			me.addToolTip();
			me.resetAllText();
		}

		if (me.rememberCombox) {
			me.getEl().down('input').on({
				scope: me,
				click: function() {
					if (!this.isExpanded) {
						me.onTriggerClick();
					}
				}
			});

			me.on('keydown', function(that, e) {
				var keyCode = e.getKey();

				if (me.isExpanded && keyCode !== 40 && keyCode !== 38) {
					me.collapse();
				}
			});
		}

		me.on('expand', function() {
			var boxWidth = me.bodyEl.getWidth(),
				maxWidth = me.getOptionsMaxWidth();

			if (maxWidth > boxWidth) {
				picker.setBorder(true);
				picker.setWidth(maxWidth + 40);
			}
		});
	},

	addToolTip: function(c) {
		var me = this;

		Ext.create('Ext.tip.ToolTip', {
			target: me.getEl(),
			html: me.getValue(),
			dismissDelay: 30000,
			listeners: {
				beforeshow: function(tip) {
					var html = '',
						value = me.getValue() || [];

					if (value.length > 0) {
						for (var i = 0; i < value.length; i++) {
							if ((i + 1) % 3 == 0) {
								html += '( ' + value[i] + ' )&nbsp;&nbsp;<br>';
							} else {
								html += '( ' + value[i] + ' ) &nbsp;&nbsp';
							}
						}
						tip.setHtml(html);
					} else {
						tip.setHtml('');
						return false;
					}
				}
			}
		});
	},

	resetAllText: function() {
		var me = this;

		me.allText = '全部选中';
		me.allValue = 'selectAll';
	},

	selectAllOptions: function(picker, record) {
		var me = this,
			firstOption = {},
			selectionModel = picker.getSelectionModel();

		if (record.get('code') === 'selectAll') {
			selectionModel.selectAll();
			selectionModel.deselect(record);
			firstOption = {
				code: 'unselectAll',
				name: '取消选中'
			}
		} else {
			selectionModel.deselectAll();
			firstOption = {
				code: 'selectAll',
				name: '全部选中'
			}
		}

		record.set(firstOption);
		me.allText = firstOption.name;
		me.allValue = firstOption.code;
	},

	clearTargetFields: function() {
		var me = this,
			form = me.up("form").getForm();

		Ext.each(me.clearFields, function(name) {
			var field = form.findField(name),
				store = field.getStore();

			field.clearValue();
			field.clearInvalid();
			me.removeAllOption(store);
			field.setValue('');
		});
	},

	loadLocalData: function() {
		var me = this;
		var store = me.getStore();
		var localData = Ext.Array.merge([], me.localData);

		if (localData.length) {
			if (!me.value) {
				me.value = "";
			}

			Ext.each(localData[0], function(key, idx) {
				if ('code' in key) {
					me.valueField = 'code';
					return false;
				}
			});

			if (me.withAll) {
				localData.unshift(me.getEmptyOption());
			}
		}

		var fields = me.getFields();

		Ext.apply(me, {
			store: {
				fields: fields,
				data: localData
			}
		});
	},

	loadRemoteData: function() {
		var me = this,
			fields = me.getFields(),
			proxy = {},
			emptyOption = me.getEmptyOption();

		proxy = {
			noCache: me.noCache,
			pageParam: false,
			startParam: false,
			limitParam: false,
			appendId: false,
			url: me.url,
			type: 'ajax',
			reader: {
				type: 'json',
				rootProperty: 'list'
			},
			listeners: {
				exception: function(that, response, operation, eOpts) {
					Ext.util.Common.errorHandler(response);
				}
			}
		};
		if (me.proxyType == 'jsonp') {
			Ext.apply(proxy, {
				type: 'jsonp',
				callbackKey: "callback",
				reader: {
					type: 'json',
					rootProperty: ''
				}
			});
		}
		Ext.apply(me, {
			store: {
				data: me.withAll ? [emptyOption] : null,
				isLoad: true,
				autoLoad: me.storeAutoLoad,
				fields: fields,
				proxy: proxy,
				listeners: {
					beforeload: function() {
						if (me.dependFields !== null) {
							return me.buildUrl();
						}
						return true;
					},
					load: function(store, records, successful, eOpts) {
						if (successful) {
							me.insertEmptyOption(store);
						}
					}
				}
			}
		});
	},

	getFields: function() {
		var me = this,
			fields;

		if (me.displayFormat) {
			fields = [{
				name: me.valueField
			}, {
				name: me.displayField,
				convert: function(val, rec) {
					var code = rec.get(me.valueField);

					return (code || typeof code === 'boolean' || typeof code === 'number') ? me.getFormatText(code, val) : val;
				}
			}];
		} else {
			fields = [me.valueField, {
				name: me.displayField,
				convert: function(val, rec) {
					if (!val) {
						return rec.get(me.valueField);
					}
					return val;
				}
			}];
		}

		if (me.valueField != "id") {
			fields.push({
				name: 'id',
				mapping: me.valueField
			});
		}

		return Ext.Array.merge(fields, me.extraFields);
	},

	buildUrl: function() {
		var me = this,
			store = me.getStore(),
			form = me.up("form").getForm(),
			url = me.url;

		for (var i = 0; i < me.dependFields.length; i++) {
			var temp = form.findField(me.dependFields[i]);
			var value = temp.getValue();
			var fieldName = temp.getName();

			if (value === null || value === '') {
				me.removeAllOption(store);
				me.setValue(me.value);

				return false;
			}

			if (temp.multiSelect) {
				value = value.join(',');
			}

			url = url.replace(eval('/{' + fieldName + '}/'), value)
		}
		store.proxy.url = url;

		return true;
	},

	removeAllOption: function(store) {
		var me = this,
			option = me.getEmptyOption();

		store.removeAll();

		if (me.withAll) {
			store.add(option);
		}
	},

	insertEmptyOption: function(store) {
		if (!this.withAll) return;

		var me = this,
			model = Ext.create("Ext.data.Model");

		model.set(me.valueField, me.allValue);
		model.set(me.displayField, me.allText);

		store.insert(0, model);
	},

	getEmptyOption: function() {
		if (!this.withAll) return {};

		var me = this,
			option = {};

		option[me.displayField] = me.allText;
		option[me.valueField] = me.allValue;

		return option;
	},

	getFormatText: function(code, name) {
		var me = this;

		return me.displayFormat
			.replace('{' + me.valueField + '}', code)
			.replace('{' + me.displayField + '}', name);
	},

	getOptionsMaxWidth: function() {
		var me = this,
			maxLength = 0,
			store = me.getStore(),
			tm = new Ext.util.TextMetrics();

		if (store.removed.length) {
			Ext.each(store.removed, function(item) {
				var name = item.get(me.displayField),
					width = tm.getWidth(name) + 25;

				if (width > maxLength) {
					maxLength = width;
				}
			});
		} else {
			store.each(function(item) {
				var name = item.get(me.displayField),
					width = tm.getWidth(name) + 25;

				if (width > maxLength) {
					maxLength = width;
				}
			});
		}

		return maxLength;
	}
});