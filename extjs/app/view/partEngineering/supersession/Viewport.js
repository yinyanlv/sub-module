Ext.define('App.view.partEngineering.supersession.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.supersession.Query',
		'App.view.partEngineering.supersession.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'supersessionquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'supersessiongrid'
	}]
});