Ext.define("Ext.ux.component.edit.Edit", {
	extend: 'Ext.ux.component.edit.Base',
	alias: 'widget.edit',
	width: 460,
	maxHeight: 500,
	header: {
		style: 'font-weight:bold;!important;'
	},
	actions: {
		'create': '新增',
		'update': '修改',
		'copy': '复制'
	},
	createDisableItems: [],
	updateDisableItems: [],
	createDisplayItems: [],
	updateDisplayItems: [],
	createNoSubmitFields: [],
	updateNoSubmitFields: [],
	defaults: {
		xtype: 'form',
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		autoScroll: true,
		defaults: {
			xtype: "textfield",
			margin: '0 0 5 0',
			labelWidth: 70,
			labelPad: 10,
			maxLength: 50,
			allowBlank: false
		},
		border: false
	},

	constructor: function(config) {
		var me = this;

		me.configLabelWidth(config);
		me.configDiabledItems();
		me.callParent(arguments);

		me.configTitle(config);
	},

	configTitle: function(config) {
		var me = this;

		me.title = me.title + '-' + me.superclass.config.actions[config.editMode];
	},

	configLabelWidth: function(config) {
		var me = this,
			maxWidth = 0,
			tm = new Ext.util.TextMetrics(),
			items = config.items ? config.items : me.items;

		Ext.each(items[0].items, function(item) {
			var labelWidth = tm.getWidth(item.fieldLabel + ':*');

			maxWidth = Math.max(labelWidth, maxWidth);
		});

		me.superclass.defaults.defaults.labelWidth = maxWidth + 5;
	},

	configDiabledItems: function() {
		var me = this;

		me.createDisableItems = Ext.Array.merge(me.createDisableItems, me.superclass.createDisableItems);
		me.updateDisableItems = Ext.Array.merge(me.updateDisableItems, me.superclass.updateDisableItems);
	},

	initComponent: function() {
		var me = this;

		me.callParent(arguments);

		if (me.editMode === 'create') {
			me.setFieldsDisabled(me.createDisableItems);
			me.setFieldsDisplay(me.createDisplayItems);
		} else if (me.editMode === 'update') {
			me.setFieldsDisabled(me.updateDisableItems);
			me.setFieldsDisplay(me.updateDisplayItems);
		}
	},

	setFieldsDisabled: function(items) {
		var me = this,
			formPanel = me.down("form");

		Ext.each(items, function(name) {
			var field = formPanel.down('[name=' + name + ']');

			field.tabIndex = -1;
			field.readOnly = true;
			field.addCls('x-item-disabled');
		});
	},

	setFieldsDisplay: function(items) {
		var me = this,
			formPanel = me.down("form");

		Ext.each(items, function(name) {
			var field = formPanel.down('[name=' + name + ']');

			field && field.show();
		});
	},

	doSave: function() {
		if (!this.getForm().isValid()) {
			return;
		}
		var me = this,
			params = me.getParams();

		me.setLoading(true);
		me.fireEvent('dosave', params);
	},

	getParams: function() {
		var me = this,
			params = {},
			items = me.getFormFields();

		Ext.each(items, function(item) {
			if (item.isNotSubmit) return true;

			if (me.editMode === "create" && me.createNoSubmitFields.indexOf(item.name) > -1) {
				return true;
			}
			if (me.editMode === "update" && me.updateNoSubmitFields.indexOf(item.name) > -1) {
				return true;
			}

			params[item.name] = item.getValue();
		});

		return params;
	},

	doCancel: function() {
		var me = this;

		me.close();
	},

	setRecord: function(params) {
		var me = this,
			formPanel = me.down("form");

		formPanel.loadRecord(params);
	},

	getForm: function() {
		var me = this,
			form = me.down("form").getForm();

		return form;
	},

	getFormFields: function() {
		var me = this,
			form = me.down("form"),
			formFields = form.query('[name]');

		return formFields;
	}
});