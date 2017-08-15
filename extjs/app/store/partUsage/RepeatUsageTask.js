Ext.define('App.store.partUsage.RepeatUsageTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partUsage.RepeatUsageTask',
	proxyAPI: {
		read: App.globalConfig.path + '/repeat-usage-task/page'
	}
});