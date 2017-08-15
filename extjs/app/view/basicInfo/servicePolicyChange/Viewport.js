Ext.define('App.view.basicInfo.servicePolicyChange.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.servicePolicyChange.Query',
		'App.view.basicInfo.servicePolicyChange.Grid',
		'App.view.basicInfo.servicePolicyChange.Edit'
	],
	items: [{
		region: 'north',
		xtype: 'servicepolicychangequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'servicepolicychangegrid'
	}]
});