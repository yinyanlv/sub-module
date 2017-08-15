Ext.define('App.store.basicInfo.LegendGroup', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.LegendGroup',
	proxyAPI: {
		read: App.globalConfig.path + '/legend-group/page',
		create: App.globalConfig.path + '/legend-group/save',
		update: App.globalConfig.path + '/legend-group/update',
		destroy: App.globalConfig.path + '/legend-group/del'
	}
});