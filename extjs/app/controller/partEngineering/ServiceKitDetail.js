Ext.define('App.controller.partEngineering.ServiceKitDetail', {
	extend: 'Ext.ux.controller.Base',
	views: ['partEngineering.serviceKitDetail.Viewport'],
	viewportId: 'servicekitdetailviewport',
	viewportReady: function() {
		var me = this;

		me.loadBasicInfo();
	},

	loadBasicInfo: function() {
		var me = this,
			kitCode = App.pageConfig.kitCode;

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/service-kit/get-kit-info',
			method: 'GET',
			disableCaching: true,
			params: {
				kitCode: kitCode
			},
			beforerequest: function() {
				me.viewport.setLoading(true);
			},
			callback: function() {
				me.viewport.setLoading(false);
			},
			success: function(root) {
				me.bindFormData(root.result);
			}
		});
	},

	bindFormData: function(result) {
		var me = this,
			form = me.viewport.down('form').getForm();

		form.setValues(result);
	}
});