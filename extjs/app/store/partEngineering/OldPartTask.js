Ext.define('App.store.partEngineering.OldPartTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.OldPartTask',
	proxyAPI: {
		read: App.globalConfig.path + '/old-part-task/list'
	},
	sorters: [{
		property: 'taskStatusCode',
		direction: 'ASC'
	}, {
		property: 'startDate',
		direction: 'ASC'
	}]
});