Ext.define('App.store.generalSettings.RoleManage', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.generalSettings.RoleManage',
	proxyAPI: {
		read: App.globalConfig.path + '/user-type/page'
	}
});