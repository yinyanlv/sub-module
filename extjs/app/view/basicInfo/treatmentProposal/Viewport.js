Ext.define('App.view.basicInfo.treatmentProposal.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.treatmentProposal.Query',
		'App.view.basicInfo.treatmentProposal.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'treatmentproposalquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'treatmentproposalgrid'
	}]
});