Ext.define('App.view.releaseControl.endPurchaseRequireTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.releaseControl.endPurchaseRequireTask.Query',
		'App.view.releaseControl.endPurchaseRequireTask.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'endpurchaserequiretaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'endpurchaserequiretaskgrid'
	}]
});