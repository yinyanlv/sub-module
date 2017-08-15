Ext.define('App.view.legendCatalog.legendCatalogList.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.legendCatalog.legendCatalogList.Query',
		'App.view.legendCatalog.legendCatalogList.Grid',
		'App.view.legendCatalog.legendCatalogList.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'legendcataloglistquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'legendcataloglistgrid'
	}]
});