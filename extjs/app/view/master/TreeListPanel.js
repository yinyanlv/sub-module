Ext.define('App.view.master.TreeListPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.treelistpanel',
	cls: 'tree-body-wrap',
	items: [{
		xtype: 'treelist',
		border: 1,
		id: 'navigationTreeList',
		reference: 'treeList',
		width: 250,
		ui: 'navigation',
		expanderFirst: false,
		expanderOnly: false,
		micro: false,
		store: Ext.create('App.store.master.NavigationTree'),
		listeners: {
			itemclick: 'onTreeListItemClick',
			treeloaded: 'onTreeListLoaded'
		}
	}]
});