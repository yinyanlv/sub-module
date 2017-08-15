Ext.define('App.store.basicInfo.ReserveSuggestType', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.ReserveSuggestType',
	proxyAPI: {
		read: App.globalConfig.path + '/reserve-suggest-type/page',
		create: App.globalConfig.path + '/reserve-suggest-type/add',
		update: App.globalConfig.path + '/reserve-suggest-type/edit',
		destroy: App.globalConfig.path + '/reserve-suggest-type/del'
	}
});