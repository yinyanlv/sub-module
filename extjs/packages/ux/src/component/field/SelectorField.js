Ext.define('Ext.ux.component.field.SelectorField', {
	extend: 'Ext.form.field.Trigger',
	alias: 'widget.selectorfield',
	requires: ['Ext.ux.component.grid.Selector'],
	triggerCls: 'x-form-browse-trigger',
	allowBlank: true,
	closeDestroy: true,
	initComponent: function() {
		var me = this;

		me.callParent(arguments);
	},

	initEvents: function() {
		var me = this;

		me.on('keydown', function(target, e) {
			if (e.altKey) {
				if (e.getKey() == 81) {
					me.openSelectorDialog();
				}
			}
		});

		this.callParent(arguments);
	},

	onTriggerClick: function(argument) {
		var me = this;

		if (me.fireEvent('beforeopen') !== false) {
		    if (me.closeDestroy) {
		        me.openSelectorDialog();
		    } else {
		        if (me.dialog) {
		            me.dialog.show();
		        } else {
		            me.openSelectorDialog();
		        }
		    }
		}
	},

	openSelectorDialog: function() {
	    var me = this;

		me.dialog = Ext.create('Ext.window.Window', {
			width: 795,
			height: 520,
			modal: true,
			resizable: false,
			layout: 'fit',
			title: me.windowTitle,
			items: [{
				xtype: 'gridselector',
				readUrl: me.readUrl,
				fields: me.getStoreFields(),
				columns: me.columns,
				paramFields: me.paramFields,
				searchInputConfig: me.searchInputConfig,
				extraFilters: me.getExtraFilters()
			}]
		});
		me.dialog.show();
		me.bindDialogEvents(me.dialog);
		me.loadDialogGridData(me.dialog);
	},

	getExtraFilters: function() {
		var me = this,
			extraFilters = [],
			form = me.up('form').getForm(),
			dependFields = me.dependFields || [];

		Ext.each(dependFields, function(item) {
			var val = form.findField(item.field).getValue();

			extraFilters.push({
				name: item.name,
				value: val
			});
		});

		return extraFilters;
	},

	getStoreFields: function() {
		var me = this,
			fields = [],
			i = 0;

		for (; i < me.fields.length; i++) {
			fields.push(me.fields[i].name);
		}

		return fields;
	},

	bindDialogEvents: function (dialog) {
		var me = this,
			grid = dialog.down('grid'),
			btnCancel = dialog.down("toolbar > button[action=cancel]");

		grid.on('rowclick', function (that, record, tr, rowIndex, e, eOpts) {
		    me.selectionGridData(record);
		    me.fireEvent("selectionchange", me, record);
		    me.closeDialog();
		});

		btnCancel.on('click', function() {
		    me.closeDialog();
		});

		dialog.on('beforeclose', function () {
		    if (me.closeDestroy) {
		        return true;
		    } else {
		        me.dialog.hide();
		        return false;
		    }
		});
	},

	selectionGridData: function (record) {
		var me = this,
		    data,
			form = me.up('form').getForm();

		data = me.getMappingData(record.data);
		form.setValues(data);
	},

	getMappingData: function(data) {
		var me = this,
			i = 0,
			name, mapping, newData = {};

		for (; i < me.fields.length; i++) {
			name = me.fields[i].name;
			mapping = me.fields[i].mapping;
			newData[mapping] = data[name];
		}

		return newData;
	},

	loadDialogGridData: function(dialog) {
		var me = this,
			grid = dialog.down('grid');

		grid.getStore().loadPage(1);
	},

	closeDialog: function () {
	    var me = this;

	    if (me.closeDestroy) {
	        me.dialog.close();
	    } else {
	        me.dialog.hide();
	    }
	}
});