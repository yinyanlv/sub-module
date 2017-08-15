Ext.define('App.view.partEngineering.servicePolicyChange.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.servicePolicyChange.Query',
		'App.view.partEngineering.servicePolicyChange.Grid',
		'App.view.partEngineering.servicePolicyChange.Edit'
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