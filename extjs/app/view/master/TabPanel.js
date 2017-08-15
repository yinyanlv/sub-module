Ext.define('App.view.master.TabPanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.mastertabpanel',
	region: 'center',
	reference: 'mainCardPanel',
	cls: 'app-main-container',
	layout: {
		type: 'card',
		anchor: '100%'
	},
	items: [{
		xtype: 'tabpanel',
		id: "tabs",
		ui: 'tabpanel-border',
		margin: '0 5 0 5',
		items: [],
		plugins: Ext.create('Ext.ux.TabCloseMenu')
	}]
});