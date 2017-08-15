Ext.define('App.view.basicInfo.rpo.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.rpo.Query',
		'App.view.basicInfo.rpo.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'rpoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'rpogrid'
	}]
});