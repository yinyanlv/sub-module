Ext.define('App.store.partEngineering.Supersession', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.Supersession',
	proxyAPI: {
		read: App.globalConfig.path + '/supersession/page',
		create: App.globalConfig.path + '/supersession/add',
		update: App.globalConfig.path + '/supersession/edit',
		destroy: App.globalConfig.path + ''
	},
	sorters: [{
		property: 'modifiedDate',
		direction: 'DESC'
	}]
});