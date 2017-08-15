Ext.define('App.view.basicInfo.salesUpcFna.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.salesUpcFna.Query',
		'App.view.basicInfo.salesUpcFna.Grid',
		'App.view.basicInfo.salesUpcFna.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'salesupcfnaquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'salesupcfnagrid'
	}]
});