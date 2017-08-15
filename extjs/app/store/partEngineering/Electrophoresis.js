Ext.define('App.store.partEngineering.Electrophoresis', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.Electrophoresis',
	proxyAPI: {
		read: App.globalConfig.path + '/electrophoresis/page'
	}
});