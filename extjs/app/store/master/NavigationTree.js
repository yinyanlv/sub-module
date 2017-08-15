Ext.define('App.store.master.NavigationTree', {
	extend: 'Ext.data.TreeStore',
	model: 'App.model.master.NavigationTree',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		noCache: false,
		url: App.globalConfig.path + '/menu',
		reader: {
			type: 'json',
			rootProperty: ''
		}
	}
});