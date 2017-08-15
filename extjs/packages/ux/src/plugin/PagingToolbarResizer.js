/**
 * PagingToolbarResizer plugin for Ext PagingToolbar
 *
 * Contains a combobox where user can choose the pagesize dynamically
 *
 * @author    Loiane Groner <http://loianegroner.com> <http://loiane.com>
 * @date      September 2011
 * @version   1 - ported to Ext JS 4
 *
 * @license Ext.ux.PagingToolbarResizer is licensed under the terms of
 * the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 * that the code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 * 
 * License details: http://www.gnu.org/licenses/lgpl.html
 */

/**
 * @class Ext.ux.PagingToolbarResizer
 *
 * Creates new PagingToolbarResizer plugin
 * @constructor
 * @param {Object} config The config object
 * 
 * How to use
 * 
	Just instatiate a new PagingToolbarResizer inside PagingToolbar plugins option:

	bbar: new Ext.PagingToolbar({
            pageSize: 25,
            store: store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display",
            plugins : [Ext.create('Ext.ux.PagingToolbarResizer', {options : [ 50, 100, 500 ] })]
    })
 */
Ext.define('Ext.ux.plugin.PagingToolbarResizer', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pagingtoolbarresizer',

	options: [5, 10, 15, 20, 25, 30, 50, 75, 100, 200, 300, 500, 1000],

	mode: 'remote',

	displayText: '每页记录数',

	recordsPerPageCmb: null,

	constructor: function(config) {

		Ext.apply(this, config);

		this.callParent(arguments);
	},

	init: function(pagingToolbar) {
		var me = this;
		var comboStore = me.options;

		me.recordsPerPageCmb = Ext.create('Ext.form.field.ComboBox', {
			typeAhead: false,
			triggerAction: 'all',
			forceSelection: true,
			lazyRender: true,
			editable: false,
			mode: me.mode,
			value: pagingToolbar.store.pageSize,
			width: 80,
			store: comboStore,
			listeners: {
				select: function(combo, value, i) {
					pagingToolbar.store.pageSize = value.data.field1;
					pagingToolbar.store.loadPage(1);
				}
			}
		});

		var index = pagingToolbar.items.indexOf(pagingToolbar.refresh);
		pagingToolbar.insert(++index, me.displayText);
		pagingToolbar.insert(++index, me.recordsPerPageCmb);
		pagingToolbar.insert(++index, '-');

		//destroy combobox before destroying the paging toolbar
		pagingToolbar.on({
			beforedestroy: function() {
				me.recordsPerPageCmb.destroy();
			}
		});
	}
});