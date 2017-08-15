Ext.define('App.view.basicInfo.damageCycle.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.damageCycle.Query',
		'App.view.basicInfo.damageCycle.Grid',
		'App.view.basicInfo.damageCycle.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'damagecyclequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'damagecyclegrid'
	}]
});