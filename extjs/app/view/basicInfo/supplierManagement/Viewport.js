Ext.define('App.view.basicInfo.supplierManagement.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.supplierManagement.Query',
		'App.view.basicInfo.supplierManagement.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'suppliermanagementquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'suppliermanagementgrid'
	}]
});