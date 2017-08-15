Ext.define('App.view.partEngineering.partPhoto.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.partPhoto.Query',
		'App.view.partEngineering.partPhoto.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'partphotoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'partphotogrid'
	}]
});