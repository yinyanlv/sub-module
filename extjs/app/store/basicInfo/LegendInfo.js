Ext.define('App.store.basicInfo.LegendInfo', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.LegendInfo',
	proxyAPI: {
		read: App.globalConfig.path + '/legend-file/page',
		create: App.globalConfig.path + '/legend-file/add',
		update: App.globalConfig.path + '/legend-file/edit',
		destroy: App.globalConfig.path + '/legend-file/del'
	}
});