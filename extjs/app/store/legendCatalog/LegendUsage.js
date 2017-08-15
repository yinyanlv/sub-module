Ext.define('App.store.legendCatalog.LegendUsage', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.legendCatalog.LegendUsage',
	proxyAPI: {
		read: App.globalConfig.path + '/legend-usage-manage/page',
		create: App.globalConfig.path + '/legend-usage-manage/add',
		update: App.globalConfig.path + '/legend-usage-manage/edit',
		destroy: App.globalConfig.path + '/legend-usage-manage/delete'
	}
});