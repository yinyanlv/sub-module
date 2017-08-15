Ext.define('App.view.basicInfo.smt.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.smt.Query',
		'App.view.basicInfo.smt.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'smtquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'smtgrid'
	}]
});