Ext.define('App.store.partEngineering.PartPhoto', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.PartPhoto',
	proxyAPI: {
		read: App.globalConfig.path + '/part-photo/page',
		create: App.globalConfig.path + '/part-photo/save',
		update: App.globalConfig.path + '/part-photo/update',
		destroy: App.globalConfig.path + '/part-photo/del'
	},
	sorters: [{
		property: 'createdDate',
		direction: 'DESC'
	}]
});