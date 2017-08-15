Ext.define('App.view.partOperation.partPurchaseInfo.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.partOperation.partPurchaseInfo.Query',
		'App.view.partOperation.partPurchaseInfo.Grid',
		'App.view.partOperation.partPurchaseInfo.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'partpurchaseinfoquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'partpurchaseinfogrid'
	}]
});