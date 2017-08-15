Ext.define('App.store.partOperation.PackageStandardInfo', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partOperation.PackageStandardInfo',
	proxyAPI: {
		read: App.globalConfig.path + '/package-standard/page',
		create: App.globalConfig.path + '/package-standard/save',
		update: App.globalConfig.path + '/package-standard/update',
		destroy: App.globalConfig.path + '/package-standard/del'
	}
});