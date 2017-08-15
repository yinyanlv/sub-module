Ext.define('App.view.basicInfo.bodyColor.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.bodyColor.Query',
		'App.view.basicInfo.bodyColor.Grid',
		'App.view.basicInfo.bodyColor.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'bodycolorquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'bodycolorgrid'
	}]
});