Ext.define('App.model.partEngineering.PartPhoto', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'id'
	}, {
		name: 'deletedCode'
	}, {
		name: 'deletedName'
	}, {
		name: 'partCode'
	}, {
		name: 'partDescription'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'photoCount'
	}, {
		name: 'photoOriginalFilename'
	}, {
		name: 'photoUltimatelyFilename'
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