Ext.define('App.store.partEngineering.StructConfirmTask', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.StructConfirmTask',
	proxyAPI: {
		read: App.globalConfig.path + '/act-confirm-task/page'
	}
});