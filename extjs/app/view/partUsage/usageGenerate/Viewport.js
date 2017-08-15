Ext.define('App.view.partUsage.usageGenerate.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partUsage.usageGenerate.Query',
		'App.view.partUsage.usageGenerate.Grid',
		'App.view.partUsage.usageGenerate.GenerateHistory'
	],

	items: [{
		region: 'north',
		xtype: 'usagegeneratequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'usagegenerategrid'
	}]
});