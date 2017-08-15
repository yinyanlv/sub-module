Ext.define('App.view.partEngineering.electrophoresisEdit.Viewport', {
	extend: 'Ext.container.Viewport',
	id: 'electrophoresiseditviewport',
	requires: [
		'App.view.partEngineering.electrophoresisEdit.BasicInfo',
		'App.view.partEngineering.electrophoresisEdit.Grid'
	],
	layout: 'fit',
	items: [{
		title: '电泳底漆颜色件修改',
		layout: 'vbox',
		xtype: 'form',
		defaults: {
			width: '100%'
		},
		bodyStyle: 'background-color:#fff',
		bodyPadding: 5,
		overflowY: true,
		items: [{
			xtype: 'electrophoresiseditbasicinfo'
		}, {
			itemId: 'grid',
			xtype: 'electrophoresiseditgrid'
		}]
	}]
});