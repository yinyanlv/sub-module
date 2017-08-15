Ext.define('App.view.generalSettings.legendTaskAssign.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.generalSettings.legendTaskAssign.Query',
		'App.view.generalSettings.legendTaskAssign.Grid',
		'App.view.generalSettings.legendTaskAssign.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'legendtaskassignquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'legendtaskassigngrid'
	}]
});