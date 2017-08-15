Ext.define('App.store.partEngineering.AftersalesProductionPartMapping', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.AftersalesProductionPartMapping',
	proxyAPI: {
		read: App.globalConfig.path + '/aftersales-production-rel/page',
		create: App.globalConfig.path + '/aftersales-production-rel/add',
		update: App.globalConfig.path + '/aftersales-production-rel/edit'
	},
	sorters: [{
		property: 'createdDate',
		direction: 'DESC'
	}]
});