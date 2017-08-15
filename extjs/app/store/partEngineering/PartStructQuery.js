Ext.define('App.store.partEngineering.PartStructQuery', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.PartStructQuery',
	proxyAPI: {
		read: App.globalConfig.path + '/part-act-structure/page'
	}
});