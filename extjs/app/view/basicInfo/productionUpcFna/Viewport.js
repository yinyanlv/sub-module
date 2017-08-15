Ext.define('App.view.basicInfo.productionUpcFna.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.productionUpcFna.Query',
		'App.view.basicInfo.productionUpcFna.Grid',
		'App.view.basicInfo.productionUpcFna.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'productionupcfnaquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'productionupcfnagrid'
	}]
});