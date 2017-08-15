Ext.define('App.view.partEngineering.serviceKit.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.serviceKit.Query',
		'App.view.partEngineering.serviceKit.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'servicekitquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'servicekitgrid'
	}]
});