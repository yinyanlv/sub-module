Ext.define('App.view.legendCatalog.legendUsage.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.legendCatalog.legendUsage.Query',
		'App.view.legendCatalog.legendUsage.Grid',
		'App.view.legendCatalog.legendUsage.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'legendusagequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'legendusagegrid'
	}]
});