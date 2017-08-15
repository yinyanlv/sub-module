Ext.define('App.view.partEngineering.eco.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.eco.Query',
		'App.view.partEngineering.eco.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'ecoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'ecogrid'
	}]
});