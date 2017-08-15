Ext.define('App.view.basicInfo.legendInfo.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.legendInfo.Query',
		'App.view.basicInfo.legendInfo.Grid',
		'App.view.basicInfo.legendInfo.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'legendinfoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'legendinfogrid'
	}]
});