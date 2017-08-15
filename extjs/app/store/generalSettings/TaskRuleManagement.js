Ext.define('App.store.generalSettings.TaskRuleManagement', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.generalSettings.TaskRuleManagement',
	proxyAPI: {
		read: App.globalConfig.path + '/task-rule/page',
		create: App.globalConfig.path + '/task-rule/add',
		update: App.globalConfig.path + '/task-rule/edit',
		destroy: App.globalConfig.path + '/task-rule/del'
	}
});