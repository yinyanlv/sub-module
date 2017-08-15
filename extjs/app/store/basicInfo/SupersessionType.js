Ext.define('App.store.basicInfo.SupersessionType', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.SupersessionType',
	proxyAPI: {
		read: App.globalConfig.path + '/supersession-type/page',
		create: App.globalConfig.path + '/supersession-type/add',
		update: App.globalConfig.path + '/supersession-type/edit',
		destroy: App.globalConfig.path + '/supersession-type/del'
	},
	sorters: [{
		property: 'code',
		direction: 'ASC'
	}]
});