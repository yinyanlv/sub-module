Ext.define('App.view.basicInfo.servicePaddingType.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.servicePaddingType.Query',
		'App.view.basicInfo.servicePaddingType.Grid',
		'App.view.basicInfo.servicePaddingType.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'servicepaddingtypequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'servicepaddingtypegrid'
	}]
});