Ext.define('App.view.partEngineering.partStructQuery.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.partStructQuery.Query',
		'App.view.partEngineering.partStructQuery.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'partstructqueryquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'partstructquerygrid'
	}]
});