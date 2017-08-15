Ext.define('App.store.basicInfo.RPO', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.RPO',
	proxyAPI: {
		read: App.globalConfig.path + '/option/page',
		create: App.globalConfig.path + '/option/add',
		update: App.globalConfig.path + '/option/edit',
		destroy: App.globalConfig.path + '/option/del'
	}
});