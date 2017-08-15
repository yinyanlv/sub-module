Ext.define('App.view.master.FastFindMenu', {
	extend: 'Ext.window.Window',
	requires: ['App.view.master.BaseMenuList'],
	title: '快速搜索菜单项',
	closable: true,
	modal: true,
	resizable: false,
	constrainHeader: true,
	layout: "fit",
	closeAction: 'destroy',
	width: 500,
	height: 350,

	listeners: {
		afterrender: function() {
			this.grid = this.down('grid');
			this.grid.bindData(this.treeStore);
			this.setSearchFocus();
		}
	},

	initEvents: function() {
		var me = this,
			tbSearch = me.down('[itemId=tbSearch]');

		tbSearch.on('keyup', function(field, e, eOpts) {
			var keyCode = e.getKey(),
				newValue = field.getValue();

			switch (keyCode) {
				case 13:
					me.grid.selectMenuItem();
					break;
				case 40:
					me.grid.nextRowSelect();
					break;
				case 38:
					me.grid.prevRowSelect();
					break;
				default:
					me.grid.filterItmes(newValue);
					break;
			}

			me.toggleSearchBoxIcon(field);
		});

		me.grid.on('selectRow', function(id) {
			me.fireEvent('selectRow', id);
		});

		this.callParent(arguments);
	},

	toggleSearchBoxIcon: function(field) {
		var me = this,
			value = field.getValue();

		if (Ext.isEmpty(value)) {
			field.triggers.clear.hide();
			field.triggers.search.show();
		} else {
			field.triggers.clear.show();
			field.triggers.search.hide();
		}
	},

	setSearchFocus: function() {
		var me = this,
			tbSearch = me.down('[itemId=tbSearch]');

		tbSearch.focus();
	},

	tbar: [{
		itemId: 'tbSearch',
		xtype: "textfield",
		width: '100%',
		emptyText: '搜索: 支持简拼与全拼',
		enableKeyEvents: true,
		triggers: {
			clear: {
				cls: 'x-form-clear-trigger',
				hidden: true,
				handler: function() {
					var me = this.up('window');

					this.setValue('');
					me.toggleSearchBoxIcon(this);
					me.grid.filterItmes('');
				}
			},
			search: {
				cls: 'x-form-search-trigger',
				hidden: false
			}
		}
	}],

	items: [{
		itemId: 'grid',
		xtype: 'masterbasemenulist',
		width: '100%',
		store: Ext.create('Ext.data.Store'),
		columns: [{
			dataIndex: 'text',
			width: 180,
			renderer: function(value, meta, record) {
				return this.getHighlightHtml(value, record);
			}
		}, {
			dataIndex: 'path',
			flex: 1,
			sortable: false,
			menuDisabled: true,
			renderer: function(value, meta, record) {
				if (!value) {
					return value
				}
				return "<span style='color:#9B9B9B;' >" + value + "</span>";
			}
		}]
	}]
});