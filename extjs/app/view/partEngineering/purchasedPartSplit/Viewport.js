Ext.define('App.view.partEngineering.purchasedPartSplit.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.purchasedPartSplit.Query',
		'App.view.partEngineering.purchasedPartSplit.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'purchasedpartsplitquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'purchasedpartsplitgrid'
	}]
});