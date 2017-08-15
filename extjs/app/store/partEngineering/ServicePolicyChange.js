Ext.define('App.store.partEngineering.ServicePolicyChange', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.ServicePolicyChange',
	proxyAPI: {
		read: App.globalConfig.path + '/service-policy-change-manage/page',
		create: App.globalConfig.path + '/service-policy-change-manage/add'
	},
	sorters: [{
		property: 'createdDate',
		direction: 'DESC'
	}]
});