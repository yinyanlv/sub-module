Ext.define('App.store.basicInfo.DamageCycle', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.DamageCycle',
	proxyAPI: {
		read: App.globalConfig.path + '/damage-cycle/page',
		create: App.globalConfig.path + '/damage-cycle/add',
		update: App.globalConfig.path + '/damage-cycle/edit',
		destroy: App.globalConfig.path + '/damage-cycle/del'
	}
});