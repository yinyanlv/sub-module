Ext.define('App.store.legendCatalog.LegendHotpointUsage', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.legendCatalog.LegendHotpointUsage',
	proxyAPI: {
		read: App.globalConfig.path + '/legend/callout-fna-manage/page'
	}
});