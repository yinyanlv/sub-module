Ext.define('App.store.partEngineering.PurchasedPartSplit', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.PurchasedPartSplit',
	proxyAPI: {
		read: App.globalConfig.path + '/develop-part-track-task/page'
	}
});