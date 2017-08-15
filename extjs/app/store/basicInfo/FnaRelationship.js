Ext.define('App.store.basicInfo.FnaRelationship', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.FnaRelationship',
	proxyAPI: {
		read: App.globalConfig.path + '/pupcfna-maintaining-task/page'
	}
});