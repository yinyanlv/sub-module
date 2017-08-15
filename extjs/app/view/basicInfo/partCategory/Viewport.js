Ext.define('App.view.basicInfo.partCategory.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.basicInfo.partCategory.Query',
		'App.view.basicInfo.partCategory.Grid',
		'App.view.basicInfo.partCategory.Edit'
	],
	items: [{
		region: 'north',
		xtype: 'partcategoryquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'partcategorygrid'
	}]
});