Ext.define('App.store.basicInfo.HSCode', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.HSCode',
	proxyAPI: {
		read: App.globalConfig.path + '/hscode/page',
		create: App.globalConfig.path + '/hscode/add',
		update: App.globalConfig.path + '/hscode/edit',
		destroy: App.globalConfig.path + '/hscode/del'
	},
	sorters: [{
		property: 'modifiedDate',
		direction: 'DESC'
	}]
});