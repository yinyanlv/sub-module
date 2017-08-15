Ext.define('App.store.partUsage.ProductionUpcFnaChangeLog', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partUsage.ProductionUpcFnaChangeLog',
	proxyAPI: {
		read: App.globalConfig.path + '/pupcfna-change-log/page'
	}
});