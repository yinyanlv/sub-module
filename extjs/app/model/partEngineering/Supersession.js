Ext.define('App.model.partEngineering.Supersession', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'id'
	}, {
		name: 'breakPointDate',
		convert: function (val) {
			return Ext.util.Format.localDate(val, 'Y-m-d');
		}
	}, {
		name: 'breakPointInfoByVin'
	}, {
		name: 'deletedCode'
	}, {
		name: 'deletedName'
	}, {
		name: 'ecrCode'
	}, {
		name: 'forecastBreakPointDate',
		convert: function (val) {
			return Ext.util.Format.localDate(val, 'Y-m-d');
		}
	}, {
		name: 'newCode'
	}, {
		name: 'newNameEn'
	}, {
		name: 'newNameZh'
	}, {
		name: 'note'
	}, {
		name: 'oldCode'
	}, {
		name: 'oldNameEn'
	}, {
		name: 'oldNameZh'
	}, {
		name: 'treatmentProposalCode'
	}, {
		name: 'treatmentProposalName'
	}, {
		name: 'typeCode'
	}, {
		name: 'typeName'
	}, {
		name: 'createdBy'
	}, {
		name: 'createdDate',
		convert: function (val) {
			return Ext.util.Format.localDate(val);
		}
	}, {
		name: 'modifiedBy'
	}, {
		name: 'modifiedDate',
		convert: function (val) {
			return Ext.util.Format.localDate(val);
		}
	}]
});