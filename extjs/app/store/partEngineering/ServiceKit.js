Ext.define('App.store.partEngineering.ServiceKit', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.ServiceKit',
	proxyAPI: {
		read: App.globalConfig.path + '/service-kit/page'
	},
	sorters: [{
		property: 'createdDate',
		direction: 'DESC'
	}]
});