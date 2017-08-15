Ext.define('App.view.partEngineering.parts.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.parts.Query',
		'App.view.partEngineering.parts.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'partsquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'partsgrid'
	}]
});