Ext.define('App.view.partEngineering.newPartTaskDetail.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'App.view.partEngineering.newPartTaskDetail.Query',
		'App.view.partEngineering.newPartTaskDetail.Grid',
		'App.view.partEngineering.newPartTaskDetail.Form'
	],
	id: 'newparttaskdetailviewport',
	layout: 'fit',
	items: [{
		title: '新件任务详细',
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
				xtype: 'newparttaskdetailquery',
				margin: '0 0 5 0'
			}, {
				itemId: 'grid',
				xtype: 'newparttaskdetailgrid',
				flex: 1
			}]
		}, {
			itemId: 'form',
			margin: '0 0 0 5',
			flex: 1,
			border: false,
			xtype: 'newparttaskdetailform'
		}]
	}]
});