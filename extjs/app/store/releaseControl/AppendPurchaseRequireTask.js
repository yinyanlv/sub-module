Ext.define('App.store.releaseControl.AppendPurchaseRequireTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.releaseControl.AppendPurchaseRequireTask',
	proxyAPI: {
		read: App.globalConfig.path + '/new-purchase-demand-task/page'
	}
});