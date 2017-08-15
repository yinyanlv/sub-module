Ext.define('App.view.basicInfo.supersessionType.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.supersessionType.Query',
		'App.view.basicInfo.supersessionType.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'supersessiontypequery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'supersessiontypegrid'
	}]
});