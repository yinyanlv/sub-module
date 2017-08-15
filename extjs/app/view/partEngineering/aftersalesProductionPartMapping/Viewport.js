Ext.define('App.view.partEngineering.aftersalesProductionPartMapping.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.aftersalesProductionPartMapping.Query',
		'App.view.partEngineering.aftersalesProductionPartMapping.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'aftersalesproductionpartmappingquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'aftersalesproductionpartmappinggrid'
	}]
});