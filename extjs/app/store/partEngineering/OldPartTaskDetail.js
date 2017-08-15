Ext.define('App.store.partEngineering.OldPartTaskDetail', {
	extend: 'Ext.data.TreeStore',
	model: 'App.model.partEngineering.OldPartTaskDetail',
	autoLoad: false,
	proxy: {
		type: 'ajax',
		noCache: true,
		url: App.globalConfig.path + '/old-part-task/detail',
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