Ext.define('App.view.master.TreeListSearch', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.treelistsearch',
	cls: 'tree-search-wrap',
	bodyPadding: '5 8 5 8',
	reference: 'treeSearchWrap',
	hidden: Ext.util.Cookies.get('nav-status') === 'true',
	items: [{
		xtype: 'textfield',
		reference: 'treeSearchBox',
		margin: '0',
		width: '100%',
		triggers: {
			clear: {
				cls: 'x-form-clear-trigger',
				hidden: true,
				handler: 'onSearchBoxClear'
			},
			search: {
				cls: 'x-form-search-trigger',
				hidden: false
			}
		},
		emptyText: '搜索: 支持简拼与全拼(Ctrl+Q)',
		enableKeyEvents: true,
		listeners: {
			keyup: 'onSearchMenuItem'
		}
	}]
});