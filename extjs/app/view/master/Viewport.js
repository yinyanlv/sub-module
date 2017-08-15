Ext.define('App.view.master.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.util.Common',
		'Ext.util.Pingyin',
		'Ext.button.Segmented',
		'Ext.ux.component.combo.BaseCombo',
		'App.view.master.Banner',
		'App.view.master.Navigation',
		'App.view.master.TabPanel',
		'App.view.master.MasterController',
		'App.view.master.MasterContainerWrap',
		'App.store.master.NavigationTree'
	],
	controller: 'master',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'masterbanner'
	}, {
		xtype: 'mastercontainerwrap',
		items: [{
			xtype: 'masternavigation'
		}, {
			xtype: 'mastertabpanel'
		}]
	}],
	listeners: {
		afterrender: "onViewportRender"
	}
});