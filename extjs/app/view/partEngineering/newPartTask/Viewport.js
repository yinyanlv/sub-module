Ext.define('App.view.partEngineering.newPartTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.newPartTask.Query',
		'App.view.partEngineering.newPartTask.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'newparttaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'newparttaskgrid'
	}]
});