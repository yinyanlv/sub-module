Ext.define('App.store.basicInfo.ProductionUpcFna', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.ProductionUpcFna',
	proxyAPI: {
		read: App.globalConfig.path + '/pupcfna/page',
		update: App.globalConfig.path + '/pupcfna/edit'
	}
});