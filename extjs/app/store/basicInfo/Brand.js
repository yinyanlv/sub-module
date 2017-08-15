Ext.define('App.store.basicInfo.Brand', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.Brand',
	proxyAPI: {
		read: App.globalConfig.path + '/brand/page',
		create: App.globalConfig.path + '/brand/add',
		update: App.globalConfig.path + '/brand/edit',
		destroy: App.globalConfig.path + '/brand/del'
	},
	sorters: [{
		property: 'code',
		direction: 'ASC'
	}]
});