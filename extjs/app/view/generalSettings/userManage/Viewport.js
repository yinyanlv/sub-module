Ext.define('App.view.generalSettings.userManage.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.generalSettings.userManage.Query',
		'App.view.generalSettings.userManage.Grid',
		'App.view.generalSettings.userManage.Edit'
	],
	items: [{
		region: 'north',
		xtype: 'userquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'usergrid'
	}]

});