Ext.define('App.view.legendCatalog.assemblyLegendGroup.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.legendCatalog.assemblyLegendGroup.Query',
		'App.view.legendCatalog.assemblyLegendGroup.Grid',
		'App.view.legendCatalog.assemblyLegendGroup.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'assemblylegendgroupquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'assemblylegendgroupgrid'
	}]
});