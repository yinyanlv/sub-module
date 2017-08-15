Ext.define('Ext.ux.component.filter.AdvancedQuery', {
	extend: 'Ext.window.Window',
	requires: ["Ext.ux.component.combo.BaseCombo"],
	width: 540,
	height: 500,
	modal: true,
	resizable: false,
	constrain: true,
	autoDestroy: true,
	closeAction: 'destroy',
	layout: {
		type: 'vbox',
		align: 'stretch',
		pack: 'start'
	},
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		ui: 'footer',
		height: 72,
		defaults: {
			height: 30
		},
		layout: {
			align: 'middle',
			pack: 'center',
			type: 'hbox'
		},
		items: [{
			xtype: 'panel',
			width: 155,
			items: [{
				itemId: 'checkSaved',
				xtype: 'checkbox',
				boxLabel: '保存条件',
				inputValue: true,
				value: true
			}]
		}, {
			xtype: 'panel',
			flex: 1,
			defaults: {
				xtype: 'button',
				width: 80,
				margin: '0 10 0 0'
			},
			layout: {
				align: 'middle',
				pack: 'center',
				type: 'hbox'
			},
			items: [{
				itemId: "do-query",
				text: "查询"
			}, {
				itemId: "cancel-query",
				text: "取消"
			}]
		}, {
			xtype: 'panel',
			width: 160,
			layout: {
				align: 'middle',
				pack: 'center',
				type: 'hbox'
			},
			items: [{
				itemId: "delete-all",
				xtype: 'linkbutton',
				width: 85,
				text: "删除全部条件",
				title: "删除全部条件"
			}, {
				width: 70,
				itemId: "clear-all",
				xtype: 'linkbutton',
				text: "清空全部值",
				title: "清空全部值"
			}]
		}]
	}],
	items: [{
		xtype: "panel",
		layout: {
			type: 'vbox',
			align: 'stretch',
			pack: 'start'
		},

		items: [{
			itemId: "header",
			xtype: "panel",
			bodyStyle: "background-color: #E0E0E0; text-align:center;",
			defaults: {
				xtype: "label",
				margin: "0 2 0 2"
			},
			height: 28,
			border: true,
			layout: {
				type: "hbox",
				pack: "center",
				align: "middle"
			},
			items: [{
				name: "property",
				width: 130
			}, {
				name: "operator",
				width: 130
			}, {
				name: "value",
				width: 200
			}, {
				name: "action",
				flex: 1
			}]
		}, {
			itemId: "container",
			xtype: "form",
			bodyStyle: "background-color: #fff; text-align:center;",
			border: false,
			flex: 1,
			height: 372,
			layout: {
				type: 'vbox',
				align: 'stretch',
				pack: 'start'
			},
			autoScroll: true,
			defaults: {
				height: 38
			},
			items: [{
				itemId: "add-row-panel",
				layout: {
					type: "hbox",
					pack: "end",
					align: "middle"
				},
				height: 38,
				defaults: {
					margin: "0 15 0 0"
				},
				items: [{
					itemId: "add-row",
					xtype: "button",
					iconCls: 'x-fa fa-plus',
					ui: "gtbar"
				}]
			}]
		}]
	}],
	listeners: {
		afterrender: function() {
			this.setHeaderText();
			this.loadRemoteCondition();
		},
		beforeclose: function() {
			if (this.allowClose) return true;

			this.validationChange();
			return false;
		}
	},

	initEvents: function() {
		this.callParent(arguments);

		var me = this;

		me.down("[itemId=do-query]").on("click", function() {
			if (me.customAdvancedQueryHandler) {
				me.customAdvancedQueryHandler.apply(me.basicQuery || null);
			} else {
				me.doQuery();
			}
		});

		me.down("[itemId=cancel-query]").on("click", function() {
			me.close();
		});

		me.down("[itemId=clear-all]").on("click", function() {
			me.clearAll();
		});

		me.down("[itemId=delete-all]").on("click", function() {
			me.deleteAll();
		});

		me.down("[itemId=add-row]").on("click", function() {
			me.addRow();
		});
	},

	loadRemoteCondition: function() {
		var me = this;

		Ext.util.Common.ajax({
			url: me.conditionUrl,
			method: "GET",
			disableCaching: true,
			beforerequest: function() {
				me.setLoading(true)
			},
			callback: function() {
				me.setLoading(false);
			},
			success: function(root) {
				me.finishLoaded(root.result || '[]');
			}
		});
	},

	finishLoaded: function(conditions) {
		var me = this,
			filterRows = me.getContainerItems("[action=row]") || [];

		conditions = JSON.parse(conditions);

		if (conditions.length > 0) {
			me.bindRow(conditions);
		} else if (filterRows.length == 0) {
			me.addRow();
		}

		me.oldConditions = conditions;
	},

	bindRow: function(params) {
		var me = this;

		Ext.each(params, function(item) {
			me.addRow(item);
		});
	},

	validationChange: function() {
		var me = this;
		var newConditions = me.getSaveParams();
		var oldConditions = me.oldConditions;

		var compare = function(a, b) {
			var aProperty = a.property.toLowerCase();
			var bProperty = b.property.toLowerCase();

			return ((aProperty < bProperty) ? -1 : ((aProperty > bProperty) ? 1 : 0));
		};

		me.allowClose = true;

		if (oldConditions.length) {
			newConditions.sort(compare);
			oldConditions.sort(compare);

			if (JSON.stringify(newConditions) !== JSON.stringify(oldConditions)) {
				Ext.Msg.confirm('提示', '条件被更改需要保存吗？', function(btn) {
					if (btn === 'yes') {
						me.saveCondition(function() {
							me.close();
						});
					} else {
						me.close();
					}
				});
				return;
			}
		}

		me.close();
	},

	setHeaderText: function() {
		var me = this,
			header = me.getHeader();

		header.down("[name=property]").setText(me.propertyText);
		header.down("[name=operator]").setText(me.operatorText);
		header.down("[name=value]").setText(me.valueText);
		header.down("[name=action]").setText(me.actionText);
	},

	addRow: function(params) {
		var me = this,
			container = me.getContainer(),
			index = container.items.length - 1,
			row = me.createRow(params);

		container.insert(index, row);
		container.body.scrollTo('top', 12000);
	},

	createRow: function(params) {
		var me = this,
			rowConfig = me.getRowConfig(params);

		return Ext.create("Ext.panel.Panel", rowConfig);
	},

	getRowConfig: function(params) {
		var me = this,
			config = {
				action: "row",
				xtype: "panel",
				rowNumber: params ? params.rowNumber + '' : '',
				required: params ? params.required : false,
				layout: {
					type: "hbox",
					pack: "center",
					align: "middle"
				},
				defaults: {
					margin: "0 2 0 2"
				},
				items: [
					me.buildProperty(params),
					me.buildOperator(params),
					me.buildInputEl(params),
					me.buildRemoveButton(params)
				]
			};

		return config;
	},

	buildProperty: function(params) {
		var me = this,
			params = params || {},
			combobox = Ext.create("Ext.ux.component.combo.BaseCombo", {
				name: "property",
				width: 130,
				url: me.propertyUrl,
				noCache: false,
				displayField: 'PropertyDesc',
				valueField: 'PropertyId',
				queryCaching: true,
				value: params.property || "",
				disabled: params.required,
				listeners: {
					change: function(that) {
						me.changeInputEl(that);
					},
					expand: function() {
						var store = this.getStore();

						store.filter(function(rec) {

							var required = rec.get('Required');

							return !required;
						});
					}
				}
			});

		return combobox;
	},

	buildOperator: function(params) {
		var me = this,
			params = params || {},
			combobox = Ext.create("Ext.ux.component.combo.BaseCombo", {
				name: "operator",
				width: 130,
				url: me.operatorUrl,
				noCache: false,
				queryCaching: true,
				disabled: params.required,
				value: params.operator
			});

		return combobox;
	},

	buildInputEl: function(params) {
		var me = this,
			inputEl,
			params = params || {},
			xtype = params.xtype,
			value = params.value,
			property = params.property,
			required = params.required,
            multiSelect = params.multiSelect,
			clearFields = params.clearFields || [],
			dependFields = params.dependFields || [],
			propertyDataUrl = params.propertyDataUrl,
			url = App.globalConfig.path + propertyDataUrl;

		if (dependFields && dependFields.length > 0) {
			url = me.formatDependUrl(dependFields, propertyDataUrl);
		}

		switch (xtype) {
			case 'textfield':
				inputEl = Ext.create('Ext.form.field.Text', {
					name: property,
					action: "value",
					width: 200,
					required: required,
					allowBlank: !required,
					value: value
				});
				break;
			case 'datefield':
				inputEl = Ext.create('Ext.form.field.Date', {
					name: property,
					action: "value",
					width: 200,
					format: 'Y-m-d',
					required: required,
					allowBlank: !required,
					value: value ? new Date(value) : null
				});
				break;
			case 'numberfield':
				inputEl = Ext.create('Ext.form.field.Number', {
					name: property,
					action: "value",
					width: 200,
					required: required,
					allowBlank: !required,
					value: value
				});
				break;
			case 'basecombo':
				inputEl = Ext.create('Ext.ux.component.combo.BaseCombo', {
					name: property,
					action: "value",
					width: 200,
					value: value,
					allowBlank: !required,
					required: required,
					clearFields: clearFields,
					dependFields: dependFields,
					rawUrl: propertyDataUrl,
					multiSelect: multiSelect,
					selectAllButton: multiSelect,
					url: url
				});
				break;
			default:
				inputEl = Ext.create('Ext.form.field.Text', {
					name: property,
					action: "value",
					width: 200,
					allowBlank: !required,
					value: value
				});
				break;
		}

		return inputEl;
	},

	buildRemoveButton: function(params) {
		var me = this,
			params = params || {};

		if (params.required) {
			return {
				xtype: 'panel',
				width: 23,
				html: '<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
			};
		} else {
			return {
				xtype: 'button',
				iconCls: 'x-fa fa-trash',
				ui: 'grid-toolbar',
				listeners: {
					click: function() {
						me.deleteSingleRow(this);
					}
				}
			};
		}
	},

	formatDependUrl: function(dependFields, propertyDataUrl) {
		var me = this,
			params = [];

		Ext.each(dependFields, function(item) {
			params.push(item + '={' + item + '}');
		});

		return App.globalConfig.path + propertyDataUrl + '?' + params.join('&');
	},

	changeInputEl: function(that) {
		var me = this,
			row = me.getRow(that),
			record = that.getSelectedRecord(),
			xtype = record ? record.get("ControlType") : '',
			propertyDataUrl = record ? record.get("PropertyDataUrl") : '',
			required = record ? record.get("Required") : '',
			clearFields = record ? record.get("ClearFields") : [],
			dependFields = record ? record.get("DependFields") : [],
            multiSelect = record ? record.get("DependFields") : false,
			oldInputEl = row.down("[action=value]"),
			newInputEl = me.buildInputEl({
				xtype: xtype,
				required: required,
				clearFields: clearFields,
				dependFields: dependFields,
				propertyDataUrl: propertyDataUrl,
				multiSelect: multiSelect,
				selectAllButton: multiSelect
			});

		row.remove(oldInputEl);
		row.insert(2, newInputEl);
	},

	deleteSingleRow: function(that) {
		var me = this,
			row = me.getRow(that),
			container = me.getContainer();

		container.remove(row);
	},

	doQuery: function() {
		var me = this,
			form = me.down('form'),
			filterParams = me.getFilterParams(),
			cbCheckSaved = me.down('[itemId=checkSaved]');

		if (!form.isValid()) {
			Ext.Msg.alert('提示', '条件格式有误或不能为空');
			return;
		}

		if (filterParams.legnth === 0) {
			Ext.Msg.alert('提示', "请添加查询条件");
			return false;
		}

		me.allowClose = true;

		if (cbCheckSaved.getValue()) {
			me.saveCondition(function() {
				me.fireEvent('doQuery', filterParams);
				me.close();
			});
		} else {
			me.fireEvent('doQuery', filterParams);
			me.close();
		}
	},

	saveCondition: function(callback) {
		var me = this,
			form = me.down('form'),
			params = me.getSaveParams();

		if (!form.isValid()) {
			Ext.Msg.alert('提示', '条件格式有误');
			return;
		}

		Ext.util.Common.ajax({
			url: me.saveConditionUrl,
			method: 'POST',
			jsonData: {
				condition: JSON.stringify(params)
			},
			success: function() {
				if (typeof callback === 'function') {
					callback();
				}
			}
		});
	},

	clearAll: function() {
		var me = this;
		var container = me.getContainer();
		var tbValues = container.query('[action=value]');

		Ext.each(tbValues, function(item) {
			item.setValue('');
		});
	},

	deleteAll: function() {
		var me = this;
		var container = me.getContainer();
		var rows = me.getContainerItems('[action=row]');

		Ext.each(rows, function(item) {
			if (!item.required) {
				container.remove(item);
			}
		});
	},

	getSaveParams: function() {
		var me = this,
			params = [],
			items = me.getContainerItems("[action=row]");

		Ext.each(items, function(item, idx) {
			var property = item.down("[name=property]").getValue() || '',
				operator = item.down("[name=operator]").getValue(),
				inputValue = item.down("[action=value]"),
				value = inputValue.getValue();

			if (property.length > 0 && operator != null && operator != undefined) {
				params.push({
					property: property,
					operator: operator,
					xtype: inputValue.xtype,
					propertyDataUrl: inputValue.rawUrl,
					value: Ext.isDate(value) ? Ext.Date.format(value, "Y-m-d") : value,
					required: inputValue.required,
					clearFields: inputValue.clearFields || '',
					dependFields: inputValue.dependFields || '',
					multiSelect: inputValue.multiSelect || '',
					rowNumber: idx
				});
			}
		});

		return params;
	},

	getFilterParams: function() {
		var me = this,
			params = [],
			items = me.getContainerItems("[action=row]");

		Ext.each(items, function(item, idx) {
			var property = item.down("[name=property]").getValue() || '',
				operator = item.down("[name=operator]").getValue(),
				value = item.down("[action=value]").getValue();

			if (property.length > 0 && operator != null && operator != undefined) {
				params.push({
					name: property,
					operators: operator,
					value: me.formtInputValue(value)
				});
			}
		});

		return params;
	},

	formtInputValue: function (value) {
	    var me = this;

	    if (Ext.isDate(value)) {
	        return Ext.Date.format(value, "Y-m-d");
	    }

	    if (Ext.isArray(value)) {
	        return value.join(',');
	    }

	    return value;
	},

	getHeader: function() {
		var me = this,
			header = me.down("[itemId=header]");

		return header;
	},

	getContainer: function() {
		var me = this,
			container = me.down("[itemId=container]");

		return container;
	},

	getContainerItems: function(selector) {
		var me = this,
			container = me.getContainer();

		return selector ? container.query(selector) : container.items.items;
	},

	getRow: function(that) {
		var me = this;

		return that.up("[action=row]");
	}
});