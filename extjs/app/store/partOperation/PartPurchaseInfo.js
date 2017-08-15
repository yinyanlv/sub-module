Ext.define('App.store.partOperation.PartPurchaseInfo', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partOperation.PartPurchaseInfo',
	proxyAPI: {
		read: App.globalConfig.path + '/part-purchase/page',
		update: App.globalConfig.path + '/part-purchase/update'
	}
});