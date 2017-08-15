Ext.define('App.view.partEngineering.usageCloseTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.usageCloseTask.Query',
		'App.view.partEngineering.usageCloseTask.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'usageclosetaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'usageclosetaskgrid'
	}]
});