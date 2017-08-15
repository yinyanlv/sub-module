Ext.define('App.store.basicInfo.ServicePaddingType', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.ServicePaddingType',
	proxyAPI: {
		read: App.globalConfig.path + '/service-info-judge-type/page',
		create: App.globalConfig.path + '/service-info-judge-type/add',
		update: App.globalConfig.path + '/service-info-judge-type/edit',
		destroy: App.globalConfig.path + '/service-info-judge-type/del'
	}
});