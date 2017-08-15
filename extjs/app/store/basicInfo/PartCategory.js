Ext.define('App.store.basicInfo.PartCategory', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.PartCategory',
	proxyAPI: {
		read: App.globalConfig.path + '/part-classify/page',
		create: App.globalConfig.path + '/part-classify/add',
		update: App.globalConfig.path + '/part-classify/edit',
		destroy: App.globalConfig.path + '/part-classify/del'
	},
	sorters: [{
		property: 'modifiedDate',
		direction: 'DESC'
	}]
});