Ext.define('App.view.partUsage.productionUpcFnaChangeLog.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partUsage.productionUpcFnaChangeLog.Query',
		'App.view.partUsage.productionUpcFnaChangeLog.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'productionupcfnachangelogquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'productionupcfnachangeloggrid'
	}]
});