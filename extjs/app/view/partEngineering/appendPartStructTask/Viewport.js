Ext.define('App.view.partEngineering.appendPartStructTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partEngineering.appendPartStructTask.Query',
		'App.view.partEngineering.appendPartStructTask.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'appendpartstructtaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'appendpartstructtaskgrid'
	}]
});