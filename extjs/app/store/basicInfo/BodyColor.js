Ext.define('App.store.basicInfo.BodyColor', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.BodyColor',
	proxyAPI: {
		read: App.globalConfig.path + '/body-color/page',
		create: App.globalConfig.path + '/body-color/add',
		update: App.globalConfig.path + '/body-color/edit',
		destroy: App.globalConfig.path + '/body-color/del'
	}
});