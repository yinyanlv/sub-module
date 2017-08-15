Ext.define('App.view.partEngineering.oldPartTaskDetail.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'App.view.partEngineering.oldPartTaskDetail.Query',
		'App.view.partEngineering.oldPartTaskDetail.Grid'
	],
	id: 'oldparttaskdetailviewport',
	layout: 'fit',
	items: [{
		title: '旧件任务详细',
		layout: 'hbox',
		defaults: {
			height: '100%'
		},
		bodyStyle: 'background-color:#eaeef1',
		bodyPadding: 5,
		items: [{
			bodyStyle: 'background-color:#eaeef1',
			flex: 2,
			layout: 'vbox',
			defaults: {
				width: '100%'
			},
			items: [{
				itemId: 'query',
				xtype: 'oldparttaskdetailquery',
				margin: '0 0 5 0'
			}, {
				itemId: 'grid',
				xtype: 'oldparttaskdetailgrid',
				flex: 1
			}]
		}]
	}]
});