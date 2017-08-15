Ext.define('App.store.basicInfo.Model', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.Model',
	proxyAPI: {
		read: App.globalConfig.path + '/model/page',
		create: App.globalConfig.path + '/model/add',
		update: App.globalConfig.path + '/model/edit',
		destroy: App.globalConfig.path + '/model/del'
	},
	sorters: [{
		property: 'code',
		direction: 'ASC'
	}]
});