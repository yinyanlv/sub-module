Ext.define('App.store.partEngineering.UsageCloseTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.UsageCloseTask',
	proxyAPI: {
		read: App.globalConfig.path + '/usage-close-task/page'
	}
});