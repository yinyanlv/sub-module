Ext.define('App.store.legendCatalog.LegendCatalogList', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.legendCatalog.LegendCatalogList',
	proxyAPI: {
		read: App.globalConfig.path + '/brand/page',
		create: App.globalConfig.path + '/brand/add',
		update: App.globalConfig.path + '/brand/edit',
		destroy: App.globalConfig.path + '/brand/del'
	}
});