Ext.define('App.view.partEngineering.structConfirmTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.structConfirmTask.Query',
		'App.view.partEngineering.structConfirmTask.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'structconfirmtaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'structconfirmtaskgrid'
	}]
});