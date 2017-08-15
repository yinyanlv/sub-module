Ext.define('App.store.generalSettings.LegendTaskAssign', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.generalSettings.LegendTaskAssign',
	proxyAPI: {
		read: App.globalConfig.path + '/legend-task-allocation/page',
		update: App.globalConfig.path + '/legend-task-allocation/edit'
	}
});