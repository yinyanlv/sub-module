Ext.define('App.store.basicInfo.LegendStandardName', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.LegendStandardName',
	proxyAPI: {
		read: App.globalConfig.path + '/legend-standard-name/page',
		create: App.globalConfig.path + '/legend-standard-name/add',
		update: App.globalConfig.path + '/legend-standard-name/edit',
		destroy: App.globalConfig.path + '/legend-standard-name/del'
	}
});