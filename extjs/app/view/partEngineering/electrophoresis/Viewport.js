Ext.define('App.view.partEngineering.electrophoresis.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.electrophoresis.Query',
		'App.view.partEngineering.electrophoresis.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'electrophoresisquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'electrophoresisgrid'
	}]
});