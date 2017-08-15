Ext.define('App.store.partEngineering.AppendPartStructTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.AppendPartStructTask',
	proxyAPI: {
		read: App.globalConfig.path + '/new-part-structure/list'
	}
});