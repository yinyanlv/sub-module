Ext.define('App.store.basicInfo.SupplierManagement', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.SupplierManagement',
	proxyAPI: {
		read: App.globalConfig.path + '/supplier/page'
	}
});