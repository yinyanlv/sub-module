Ext.define('App.view.partOperation.packageStandardInfo.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partOperation.packageStandardInfo.Query',
		'App.view.partOperation.packageStandardInfo.Grid',
		'App.view.partOperation.packageStandardInfo.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'packagestandardinfoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'packagestandardinfogrid'
	}]
});