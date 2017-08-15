Ext.define('App.model.partEngineering.NewPartTaskDetail', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'id'
	}, {
		name: 'colorCode'
	}, {
		name: 'colorName'
	}, {
		name: 'colors'
	}, {
		name: 'createdBy'
	}, {
		name: 'createdDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'ecrCode'
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'generatedColors'
	}, {
		name: 'generatedPartColorNames'
	}, {
		name: 'plmGeneratedColorNames'
	}, {
		name: 'leaf'
	}, {
		name: 'level'
	}, {
		name: 'modifiedBy'
	}, {
		name: 'modifiedDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'parentPartCode'
	}, {
		name: 'partCode'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'plmGeneratedColors'
	}, {
		name: 'plmIsColorPart'
	}, {
		name: 'plmIsColorPartName'
	}, {
		name: 'qty'
	}, {
		name: 'recommendServicePolicyCode'
	}, {
		name: 'recommendServicePolicyName'
	}, {
		name: 'recommendSte'
	}, {
		name: 'recommendSteName'
	}, {
		name: 'retain'
	}, {
		name: 'servicePartTypeCode'
	}, {
		name: 'servicePartTypeName'
	}, {
		name: 'servicePolicyCode'
	}, {
		name: 'servicePolicyName'
	}, {
		name: 'serviceSupportTypeCode'
	}, {
		name: 'serviceSupportTypeName'
	}, {
		name: 'serviceSupportTypeNote'
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'status'
	}, {
		name: 'statusName'
	}, {
		name: 'ste'
	}, {
		name: 'steName'
	}, {
		name: 'treatmentProposalCode'
	}, {
		name: 'treatmentProposalName'
	}]
});