Ext.define('App.view.basicInfo.reserveSuggestType.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.reserveSuggestType.Query',
		'App.view.basicInfo.reserveSuggestType.Grid',
		'App.view.basicInfo.reserveSuggestType.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'reservesuggesttypequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'reservesuggesttypegrid'
	}]
});