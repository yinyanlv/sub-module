Ext.define('App.view.partEngineering.ecoDetail.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'App.view.partEngineering.ecoDetail.BasicInfo',
		'App.view.partEngineering.newPartTaskDetail.Grid',
		'App.view.partEngineering.newPartTaskDetail.Form',
		'App.view.partEngineering.oldPartTaskDetail.Grid',
		'App.view.partEngineering.ecoDetail.ServiceInfo'
	],
	id: 'ecodetailviewport',
	layout: 'fit',
	items: [{
		title: 'ECO详细',
		layout: 'vbox',
		bodyStyle: 'background-color:#eaeef1',
		bodyPadding: 5,
		defaults: {
			width: '100%',
			margin: '0 0 10 0'
		},
		items: [{
			itemId: 'basic-info',
			xtype: 'ecodetailbasicInfo',
			bodyPadding: 5
		}, {
			xtype: 'tabpanel',
			ui: 'tabpanel-border',
			flex: 1,
			items: [{
				title: '新件任务',
				layout: 'hbox',
				defaults: {
					height: '100%'
				},
				items: [{
					itemId: 'newparttask-grid',
					xtype: 'newparttaskdetailgrid',
					padding: 5,
					flex: 2
				}, {
					itemId: 'newparttask-form',
					xtype: 'newparttaskdetailform',
					flex: 1
				}]
			}, {
				title: '旧件任务',
				layout: 'hbox',
				items: [{
					itemId: 'oldparttask-grid',
					xtype: 'oldparttaskdetailgrid',
					padding: 5,
					height: '100%',
					flex: 1
				}]
			}, {
				title: '维修信息',
				layout: 'vbox',
				items: [{
					itemId: 'ecodetailserviceinfo-grid',
					xtype: 'ecodetailserviceinfo',
					height: '100%',
					width: '100%'
				}]
			}]
		}]
	}]
});