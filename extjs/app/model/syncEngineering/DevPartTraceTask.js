Ext.define('App.model.syncEngineering.DevPartTraceTask', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'colorAccessory'
	}, {
		name: 'createdBy'
	}, {
		name: 'createdDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.createdDate);
		}
	}, {
		name: 'description'
	}, {
		name: 'designResponsibility'
	}, {
		name: 'designStageCode'
	}, {
		name: 'designStageName'
	}, {
		name: 'dreCode'
	}, {
		name: 'dreName'
	}, {
		name: 'fna'
	}, {
		name: 'initialSeriesCode'
	}, {
		name: 'initialSeriesName'
	}, {
		name: 'isColorAccessoryName'
	}, {
		name: 'makeOrBuy'
	}, {
		name: 'modifiedBy'
	}, {
		name: 'modifiedDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.modifiedDate);
		}
	}, {
		name: 'modifySteNote'
	}, {
		name: 'newSteCode'
	}, {
		name: 'newSteName'
	}, {
		name: 'trackNote'
	}, {
		name: 'oldSteCode'
	}, {
		name: 'oldSteName'
	}, {
		name: 'partCode'
	}, {
		name: 'partCurrentVersion'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'partTypeCode'
	}, {
		name: 'partTypeName'
	}, {
		name: 'partinitialVersion'
	}, {
		name: 'partitionCode'
	}, {
		name: 'smtCode'
	}, {
		name: 'smtName'
	}, {
		name: 'taskFinishedNote'
	}, {
		name: 'taskStatusCode'
	}, {
		name: 'taskStatusName'
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.startDate);
		}
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.endDate);
		}
	}, {
		name: 'modifySteDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data.modifySteDate);
		}
	}]
});