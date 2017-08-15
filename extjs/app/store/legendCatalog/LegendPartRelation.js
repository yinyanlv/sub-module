Ext.define('App.store.legendCatalog.LegendPartRelation', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.legendCatalog.LegendPartRelation',
	proxyAPI: {
		read: App.globalConfig.path + '/legend-part-manage/page',
		destroy: App.globalConfig.path + '/legend-part-manage/del'
	}
});