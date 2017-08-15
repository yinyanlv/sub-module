Ext.define('App.store.partOperation.PackageMaterialInfo', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partOperation.PackageMaterialInfo',
	proxyAPI: {
		read: App.globalConfig.path + '/package-material/page',
		create: App.globalConfig.path + '/package-material/add',
		update: App.globalConfig.path + '/package-material/edit',
		destroy: App.globalConfig.path + '/package-material/del'
	}
});