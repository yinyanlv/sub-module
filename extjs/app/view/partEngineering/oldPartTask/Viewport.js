Ext.define('App.view.partEngineering.oldPartTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.oldPartTask.Query',
		'App.view.partEngineering.oldPartTask.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'oldparttaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'oldparttaskgrid'
	}]
});