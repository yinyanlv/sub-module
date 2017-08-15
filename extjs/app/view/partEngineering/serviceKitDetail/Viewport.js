Ext.define('App.view.partEngineering.serviceKitDetail.Viewport', {
	extend: 'Ext.container.Viewport',
	id: 'servicekitdetailviewport',
	requires: [
		'App.view.partEngineering.serviceKitDetail.BasicInfo',
		'App.view.partEngineering.serviceKitDetail.Grid'
	],
	layout: 'fit',
	items: [{
		title: '维修包详细',
		layout: 'vbox',
		xtype: 'form',
		defaults: {
			width: '100%'
		},
		bodyStyle: 'background-color:#fff',
		bodyPadding: 5,
		overflowY: true,
		items: [{
			xtype: 'servicekitdetailbasicinfo'
		}, {
			xtype: 'servicekitdetailgrid'
		}]
	}]
});