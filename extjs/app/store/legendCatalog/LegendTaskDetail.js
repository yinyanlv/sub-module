Ext.define('App.store.legendCatalog.LegendTaskDetail', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.legendCatalog.LegendTaskDetail',
	proxyAPI: {
		read: App.globalConfig.path + '/legend/task-detail/list'
	}
});