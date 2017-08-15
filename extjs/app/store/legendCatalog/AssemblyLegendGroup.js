Ext.define('App.store.legendCatalog.AssemblyLegendGroup', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.legendCatalog.AssemblyLegendGroup',
	proxyAPI: {
		read: App.globalConfig.path + '/legend/rootpart-group-manage/page',
		update: App.globalConfig.path + '/legend/rootpart-group-manage/edit'
	}
});