Ext.define('App.view.basicInfo.brand.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.brand.Query',
		'App.view.basicInfo.brand.Grid',
		'App.view.basicInfo.brand.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'brandquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'brandgrid'
	}]
});