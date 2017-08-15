Ext.define('App.store.basicInfo.ServiceSupportType', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.ServiceSupportType',
	proxyAPI: {
		read: App.globalConfig.path + '/service-support-type/page'
	}
});