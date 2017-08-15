Ext.define('App.store.generalSettings.UserManage', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.generalSettings.UserManage',
	proxyAPI: {
		read: App.globalConfig.path + '/user/page',
		update: App.globalConfig.path + '/user/edit'
	},
	sorters: [{
		property: 'modifiedDate',
		direction: 'DESC'
	}]
});