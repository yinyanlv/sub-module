Ext.define('App.store.partEngineering.NewPartTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.NewPartTask',
	proxyAPI: {
		read: App.globalConfig.path + '/new-part-task/page'
	},
	sorters: [{
		property: 'taskStatusCode',
		direction: 'ASC'
	}, {
		property: 'startDate',
		direction: 'ASC'
	}]
});