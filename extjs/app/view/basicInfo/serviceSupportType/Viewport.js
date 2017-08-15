Ext.define('App.view.basicInfo.serviceSupportType.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.serviceSupportType.Query',
		'App.view.basicInfo.serviceSupportType.Grid',
		'App.view.basicInfo.serviceSupportType.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'servicesupporttypequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'servicesupporttypegrid'
	}]
});