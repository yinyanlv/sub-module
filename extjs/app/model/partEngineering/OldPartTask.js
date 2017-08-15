Ext.define('App.model.partEngineering.OldPartTask', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'afterSaleNote'
	}, {
		name: 'ecrCode'
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.endDate);
		}
	}, {
		name: 'forecastBreakPointDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.forecastBreakPointDate);
		}
	}, {
		name: 'newPartCode'
	}, {
		name: 'newPartNameEn'
	}, {
		name: 'newPartNameZh'
	}, {
		name: 'newServicePolicyCode'
	}, {
		name: 'newServicePolicyName'
	}, {
		name: 'oldPartCode'
	}, {
		name: 'oldPartNameEn'
	}, {
		name: 'oldPartNameZh'
	}, {
		name: 'oldServicePartTypeCode'
	}, {
		name: 'oldServicePartTypeName'
	}, {
		name: 'oldServicePolicyCode'
	}, {
		name: 'oldServicePolicyName'
	}, {
		name: 'recommendSteCode'
	}, {
		name: 'recommendSteName'
	}, {
		name: 'sapNote'
	}, {
		name: 'serviceSupportTypeCode'
	}, {
		name: 'serviceSupportTypeName'
	}, {
		name: 'serviceSupportTypeNote'
	}, {
		name: 'smtCode'
	}, {
		name: 'smtName'
	}, {
		name: 'source'
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.startDate);
		}
	}, {
		name: 'steCode'
	}, {
		name: 'steModifiedDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.steModifiedDate);
		}
	}, {
		name: 'steModifiedNote'
	}, {
		name: 'steName'
	}, {
		name: 'supersessionNote'
	}, {
		name: 'supersessionTypeCode'
	}, {
		name: 'supersessionTypeName'
	}, {
		name: 'taskStatusCode'
	}, {
		name: 'taskStatusName'
	}, {
		name: 'treatmentProposalCode'
	}, {
		name: 'treatmentProposalName'
	}, {
		name: 'wasServicePart'
	}]
});