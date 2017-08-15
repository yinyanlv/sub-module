Ext.define('App.view.basicInfo.series.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.series.Query',
		'App.view.basicInfo.series.Grid',
		'App.view.basicInfo.series.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'seriesquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'seriesgrid'
	}]
});