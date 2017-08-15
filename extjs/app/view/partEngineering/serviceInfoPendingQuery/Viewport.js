Ext.define('App.view.partEngineering.serviceInfoPendingQuery.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.serviceInfoPendingQuery.Query',
		'App.view.partEngineering.serviceInfoPendingQuery.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'serviceInfopendingqueryquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'serviceInfopendingquerygrid'
	}]
});