Ext.define('App.model.partEngineering.OldPartTaskDetail', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id'
	}, {
		name: 'partCode'
	}, {
		name: 'status'
	}, {
		name: 'statusName'
	}, {
		name: 'parentPartCode'
	}, {
		name: 'servicePolicyCode'
	}, {
		name: 'servicePolicyName'
	}, {
		name: 'changeReasonCode'
	}, {
		name: 'changeReasonName'
	}, {
		name: 'serviceSupportTypeCode'
	}, {
		name: 'serviceSupportTypeName'
	}, {
		name: 'serviceSupportTypeNote'
	}, {
		name: 'newPartCode'
	}, {
		name: 'supersessionTypeCode'
	}, {
		name: 'supersessionTypeName'
	}, {
		name: 'treatmentProposalCode'
	}, {
		name: 'treatmentProposalName'
	}, {
		name: 'supersessionNote'
	}, {
		name: 'forecastBreakPointDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'smtCode'
	}, {
		name: 'smtName'
	}, {
		name: 'source'
	}, {
		name: 'sapNote'
	}, {
		name: 'afterSaleNote'
	}, {
		name: 'recommendSteCode'
	}, {
		name: 'recommendSteName'
	}, {
		name: 'steCode'
	}, {
		name: 'steName'
	}, {
		name: 'partNameZh'
	}, {
		name: 'partNameEn'
	}, {
		name: 'wasServicePart'
	}, {
		name: 'newPartNameZh'
	}, {
		name: 'newPartNameEn'
	}, {
		name: 'newServicePolicyCode'
	}, {
		name: 'newServicePolicyName'
	}, {
		name: 'ecoCode'
	}, {
		name: 'ecrCode'
	}, {
		name: 'leaf'
	}, {
		name: 'level'
	}, {
		name: 'children'
	}]
});