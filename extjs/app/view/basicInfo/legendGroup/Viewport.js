Ext.define('App.view.basicInfo.legendGroup.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.legendGroup.Query',
		'App.view.basicInfo.legendGroup.Grid',
		'App.view.basicInfo.legendGroup.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'legendgroupquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'legendgroupgrid'
	}]
});