Ext.define('App.view.basicInfo.fnaRelationship.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.fnaRelationship.Query',
		'App.view.basicInfo.fnaRelationship.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'fnarelationshipquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'fnarelationshipgrid'
	}]
});