Ext.define('App.store.partEngineering.ElectrophoresisEdit', {
	extend: 'Ext.data.Store',
	model: 'App.model.partEngineering.ElectrophoresisEdit',
	autoLoad: true,
	proxy: {
		type: 'ajax',
		noCache: true,
		url: App.globalConfig.path + '/electrophoresis/detail?code=' + App.pageConfig.code,
		reader: {
			type: 'json',
			rootProperty: ''
		}
	}
});