Ext.define('App.store.partEngineering.Parts', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.Parts',
	proxyAPI: {
		read: App.globalConfig.path + '/part/page'
	}
});