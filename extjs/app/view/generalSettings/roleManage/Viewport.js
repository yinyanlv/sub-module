Ext.define('App.view.generalSettings.roleManage.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.generalSettings.roleManage.Query',
		'App.view.generalSettings.roleManage.Grid'
	],
	items: [{
		region: 'north',
		xtype: 'rolequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'rolegrid'
	}]
});