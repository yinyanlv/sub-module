Ext.define('App.model.partEngineering.ServicePolicyChange', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'id'
	}, {
		name: 'changeReasonCode'
	}, {
		name: 'changeReasonName'
	}, {
		name: 'createdBy'
	}, {
		name: 'createdDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.createdDate);
		}
	}, {
		name: 'newServicePolicyCode'
	}, {
		name: 'newServicePolicyName'
	}, {
		name: 'oldServicePolicyCode'
	}, {
		name: 'oldServicePolicyName'
	}, {
		name: 'partCode'
	}, {
		name: 'partDescription'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'serviceSupportTypeCode'
	}, {
		name: 'serviceSupportTypeNote'
	}]
});