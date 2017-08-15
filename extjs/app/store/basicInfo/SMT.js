Ext.define('App.store.basicInfo.SMT', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.SMT',
	proxyAPI: {
		read: App.globalConfig.path + '/smt/page',
		create: App.globalConfig.path + '/smt/add',
		update: App.globalConfig.path + '/smt/edit',
		destroy: App.globalConfig.path + '/smt/del'
	}
});