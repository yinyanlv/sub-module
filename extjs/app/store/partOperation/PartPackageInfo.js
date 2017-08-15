Ext.define('App.store.partOperation.PartPackageInfo', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partOperation.PartPackageInfo',
	proxyAPI: {
		read: App.globalConfig.path + '/part-package/page',
		update: App.globalConfig.path + '/part-package/update'
	}
});