Ext.define('App.view.releaseControl.appendPurchaseRequireTask.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.releaseControl.appendPurchaseRequireTask.Query',
		'App.view.releaseControl.appendPurchaseRequireTask.Grid'
	],

	items: [{
		region: 'north',
		xtype: 'appendpurchaserequiretaskquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'appendpurchaserequiretaskgrid'
	}]
});