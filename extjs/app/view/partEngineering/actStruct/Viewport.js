Ext.define('App.view.partEngineering.actStruct.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.actStruct.Query',
		'App.view.partEngineering.actStruct.Grid'
	],
	items: [{
		itemId: 'query',
		region: 'north',
		xtype: 'actstructquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		itemId: 'grid',
		region: 'center',
		xtype: 'actstructgrid'
	}]
});