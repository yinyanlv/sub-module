Ext.define('App.view.basicInfo.model.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.model.Query',
		'App.view.basicInfo.model.Grid',
		'App.view.basicInfo.model.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'modelquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'modelgrid'
	}]
});