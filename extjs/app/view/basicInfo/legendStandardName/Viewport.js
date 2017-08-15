Ext.define('App.view.basicInfo.legendStandardName.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.legendStandardName.Query',
		'App.view.basicInfo.legendStandardName.Grid',
		'App.view.basicInfo.legendStandardName.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'legendstandardnamequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'legendstandardnamegrid'
	}]
});