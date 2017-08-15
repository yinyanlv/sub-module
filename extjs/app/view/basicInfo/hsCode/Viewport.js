Ext.define('App.view.basicInfo.hsCode.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.hsCode.Query',
		'App.view.basicInfo.hsCode.Grid',
		'App.view.basicInfo.hsCode.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'hscodequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'hscodegrid'
	}]
});