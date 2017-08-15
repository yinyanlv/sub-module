Ext.define('App.store.partUsage.UsageGenerate', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partUsage.UsageGenerate',
	proxyAPI: {
		read: App.globalConfig.path + '/usage/page'
	}
});