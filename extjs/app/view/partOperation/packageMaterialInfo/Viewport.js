Ext.define('App.view.partOperation.packageMaterialInfo.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partOperation.packageMaterialInfo.Query',
		'App.view.partOperation.packageMaterialInfo.Grid',
		'App.view.partOperation.packageMaterialInfo.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'packagematerialinfoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'packagematerialinfogrid'
	}]
});