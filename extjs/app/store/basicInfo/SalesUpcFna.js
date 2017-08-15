Ext.define('App.store.basicInfo.SalesUpcFna', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.SalesUpcFna',
	proxyAPI: {
		read: App.globalConfig.path + '/supcfna/page',
		create: App.globalConfig.path + '/supcfna/add',
		update: App.globalConfig.path + '/supcfna/edit',
		destroy: App.globalConfig.path + '/supcfna/del'
	}
});