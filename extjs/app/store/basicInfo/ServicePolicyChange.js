Ext.define('App.store.basicInfo.ServicePolicyChange', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.ServicePolicyChange',
	proxyAPI: {
		read: App.globalConfig.path + '/service-policy-change-reason/page',
		create: App.globalConfig.path + '/service-policy-change-reason/add',
		update: App.globalConfig.path + '/service-policy-change-reason/edit',
		destroy: App.globalConfig.path + '/service-policy-change-reason/del'
	}
});