Ext.define('App.view.syncEngineering.devPartTraceTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.syncEngineering.devPartTraceTask.Query',
		'App.view.syncEngineering.devPartTraceTask.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'devparttracetaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'devparttracetaskgrid'
	}]
});