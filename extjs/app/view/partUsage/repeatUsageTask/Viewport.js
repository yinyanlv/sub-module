Ext.define('App.view.partUsage.repeatUsageTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partUsage.repeatUsageTask.Query',
		'App.view.partUsage.repeatUsageTask.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'repeatusagetaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'repeatusagetaskgrid'
	}]
});