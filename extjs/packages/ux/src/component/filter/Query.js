﻿Ext.define('Ext.ux.component.filter.Query', {
	extend: 'Ext.form.Panel',
	alias: 'widget.componentfilterquery',
	plugins: ['formlabelrequired'],
	autoScroll: true,
	autoLabelWidth: false,
	bodyPadding: '5 10 0 10',
	ui: 'grid',
	header: {
		style: 'border-bottom:1px solid #EAEDF1 !important;'
	},
	title: '<span class="vertical-line">查询区域</span>',
	defaults: {
		xtype: 'form',
		layout: 'column',
		border: false,
		minWidth: 980,
		defaults: {
			xtype: 'textfield',
			margin: '5 15 0 0',
			labelWidth: 100,
			enableKeyEvents: true
		}
	},
	advancedSearch: null,
	customAdvancedQueryHandler: null,
	advancedQueryComponent: null,
	itemId: "query-form",
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		border: true,
		layout: {
			align: 'middle',
			pack: 'center',
			type: 'hbox'
		},
		height: 'auto',
		style: 'padding-bottom: 5px;padding-top: 5px;',
		defaults: {
			width: 80
		},
		items: [{
			xtype: 'button',
			action: "query",
			text: "查询"
		}, {
			xtype: 'button',
			action: "reset",
			text: "重置"
		}]
	}],

	constructor: function() {
		var me = this;

		if (me.bbrExtendItems) {
			me.extendBbrItems();
		}
		if (me.bbrOverrideItems) {
			me.overrideBarItems();
		}
		if (me.advancedSearch) {
			me.addAdvancedSearch();
		}

		me.callParent(arguments);
	},

	initComponent: function() {
		var me = this;

		me.callParent(arguments);

		if (me.autoLabelWidth) {
			me.autoMetricsLabelWidth();
		}
	},

	addAdvancedSearch: function() {
		var me = this;
		var button = {
			iconCls: 'x-fa fa-search-plus advanced-search-tool-el',
			tooltip: '高级查询',
			action: 'advanced-query'
		};

		if (Ext.isArray(me.tools)) {
			me.tools.add(button);
		} else {
			me.tools = [button];
		}
	},

	autoMetricsLabelWidth: function() {
		var me = this,
			boxWidth = 120,
			labelPad = 5,
			fields = me.query("field"),
			tm = new Ext.util.TextMetrics();

		Ext.each(fields, function(item) {
			var labelWidth = tm.getWidth(item.fieldLabel + ':') + 5;

			if (item.range == 'end') {
				item.labelWidth = 0;
				item.width = boxWidth;
			} else {
				item.labelWidth = labelWidth;
				item.width = labelWidth + boxWidth + labelPad;
			}
		});
	},

	initEvents: function() {
		var me = this,
			fields = me.query("field"),
			btnQuery = me.down("[action=query]"),
			btnReset = me.down("[action=reset]"),
			btnAdvancedQuery = me.down("[action=advanced-query]");

		if (btnQuery) {
			btnQuery.on("click", function() {
				me.doQuery();
			});
		}
		if (btnReset) {
			btnReset.on("click", function() {
				me.doReset();
			});
		}
		if (btnAdvancedQuery) {
			btnAdvancedQuery.on("click", function() {
				me.openAdvancedSearch();
			});
		}
		Ext.each(fields, function(item) {
			item.on("keyup", function(sender, e) {
				if (e.getKey() === e.ENTER) me.doQuery();
			});
		});

		me.callParent(arguments);
	},

	doQuery: function() {
		if (!this.isValid()) return;

		var me = this,
			filters = me.getFilters();

		me.fireEvent('queryRecord', filters);
	},

	openAdvancedSearch: function() {
		var me = this;
		var config = me.advancedSearch || {};

		var advancedQuery = Ext.create("Ext.ux.component.filter.AdvancedQuery", {
			propertyUrl: config.propertyUrl || '',
			operatorUrl: config.operatorUrl || '',
			conditionUrl: config.conditionUrl || '',
			saveConditionUrl: config.saveConditionUrl || '',
			listeners: {
				doQuery: function(filters) {
					me.fireEvent('queryRecord', filters);
				}
			},
			basicQuery: me,
			customAdvancedQueryHandler: me.customAdvancedQueryHandler
		});
		advancedQuery.show();

		me.advancedQueryComponent = advancedQuery;
	},

	doReset: function() {
		var me = this,
			fields = me.query("field");

		Ext.each(fields, function(item) {
			item.setValue("");
		});
	},

	extendBbrItems: function() {
		var me = this,
			superItems = me.superclass.dockedItems[0].items;

		me.superclass.dockedItems[0].items = Ext.Array.merge(superItems, me.bbrExtendItems);
	},

	overrideBarItems: function() {

		this.superclass.dockedItems[0].items = this.bbrOverrideItems;
	},

	getFilters: function() {
		var me = this,
			params = [],
			fields = me.query("field");

		Ext.each(fields, function(item) {
			var value = me.formatValue(item);

			if (!me.isEmptyValue(value)) {
				params.push({
					name: item.name,
					value: value
				});
			}
		});

		return params;
	},

	isEmptyValue: function(value) {
		var me = this;

		if (value == null || (typeof value == 'string' && value.length == 0)) {
			return true;
		}

		return false;
	},

	formatValue: function(item) {
		var me = this,
			value = item.getValue();

		if (item.xtype === "textfield") {
			return Ext.util.Format.trim(value);
		}
		if (item.xtype === "basecombo" || item.xtype === "combobox") {
			return Ext.isArray(value) ? value.join(",") : value;
		}
		if (item.xtype == "checkbox") {
			return value == true ? 1 : "";
		}

		return value;
	}
});