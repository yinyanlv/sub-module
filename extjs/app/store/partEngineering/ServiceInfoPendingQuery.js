Ext.define('App.store.partEngineering.ServiceInfoPendingQuery', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.ServiceInfoPendingQuery',
	proxyAPI: {
		read: App.globalConfig.path + '/eco-service-determine/page'
	},
	sorters: [{
		property: 'modifiedDate',
		direction: 'DESC'
	}]
});