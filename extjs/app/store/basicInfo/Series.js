Ext.define('App.store.basicInfo.Series', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.Series',
	proxyAPI: {
		read: App.globalConfig.path + '/series/page',
		create: App.globalConfig.path + '/series/add',
		update: App.globalConfig.path + '/series/edit',
		destroy: App.globalConfig.path + '/series/del'
	}
});