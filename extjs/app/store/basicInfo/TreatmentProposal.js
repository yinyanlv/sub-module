Ext.define('App.store.basicInfo.TreatmentProposal', {
	extend: 'Ext.ux.store.Base',
	model: 'App.model.basicInfo.TreatmentProposal',
	proxyAPI: {
		read: App.globalConfig.path + '/treatment-proposal/page',
		create: App.globalConfig.path + '/treatment-proposal/add',
		update: App.globalConfig.path + '/treatment-proposal/edit',
		destroy: App.globalConfig.path + '/treatment-proposal/del'
	}
});