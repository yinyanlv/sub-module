Ext.define('App.store.releaseControl.EndPurchaseRequireTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.releaseControl.EndPurchaseRequireTask',
	proxyAPI: {
		read: App.globalConfig.path + '/stop-purchase-demand-task/page'
	}
});