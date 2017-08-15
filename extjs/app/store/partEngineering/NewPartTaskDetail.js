Ext.define('App.store.partEngineering.NewPartTaskDetail', {
	extend: 'Ext.data.TreeStore',
	model: 'App.model.partEngineering.NewPartTaskDetail',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		noCache: true,
		url: App.globalConfig.path + '/new-part-task/detail',
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