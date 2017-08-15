Ext.define('App.store.syncEngineering.DevPartTraceTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.syncEngineering.DevPartTraceTask',
	proxyAPI: {
		read: App.globalConfig.path + '/develop-part-track-task/page'
	},
	sorters: [{
		property: 'taskStatusCode',
		direction: 'ASC'
	}, {
		property: 'startDate',
		direction: 'ASC'
	}]
});