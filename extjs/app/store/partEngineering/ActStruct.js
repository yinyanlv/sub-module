Ext.define('App.store.partEngineering.ActStruct', {
	extend: 'Ext.data.TreeStore',
	model: 'App.model.partEngineering.ActStruct',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		noCache: true,
		url: App.globalConfig.path + '/act/query-act',
		reader: {
			type: 'json',
			rootProperty: ''
		}
	},
	root: {
		partCode: 'root',
		expanded: true,
		children: []
	}
});