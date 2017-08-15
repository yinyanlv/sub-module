Ext.define('App.store.partEngineering.ECO', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.partEngineering.ECO',
	proxyAPI: {
		read: App.globalConfig.path + '/eco/page'
	},
	sorters: [{
		property: 'ecrForecastBreakpoint',
		direction: 'DESC'
	}]
});