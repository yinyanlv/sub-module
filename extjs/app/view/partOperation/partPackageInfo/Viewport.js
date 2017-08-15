Ext.define('App.view.partOperation.partPackageInfo.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partOperation.partPackageInfo.Query',
		'App.view.partOperation.partPackageInfo.Grid',
		'App.view.partOperation.partPackageInfo.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'partpackageinfoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'partpackageinfogrid'
	}]
});