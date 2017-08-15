Ext.define('App.view.master.Navigation', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.masternavigation',
	requires: [
		'App.view.master.TreeListSearch',
		'App.view.master.TreeListPanel',
		'App.view.master.BaseMenuList'
	],
	id: 'navigation-wrap',
	reference: 'navigationWrap',
	region: 'west',
	scrollable: 'y',
	cls: 'treelist-with-nav',
	width: (function() {
		var status = (Ext.util.Cookies.get('nav-status') == 'true');

		return status ? 64 : 250;
	})(),
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'treelistsearch'
	}, {
		xtype: 'treelistpanel',
		reference: 'treeListWrap'
	}, {
		xtype: 'masterbasemenulist',
		reference: 'navMenuList',
		store: Ext.create('Ext.data.Store'),
		width: '100%',
		hidden: true,
		flex: 1,
		columns: [{
			dataIndex: 'text',
			width: '100%',
			renderer: function(value, meta, record) {
				var cell = this.getHighlightHtml(value, record);

				return cell;
			}
		}]
	}]
});