Ext.define('App.model.partEngineering.AppendPartStructTask', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'afterSaleNote'
	}, {
		name: 'description'
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'parentPartCodes'
	}, {
		name: 'parentPartNamesEn'
	}, {
		name: 'parentPartNamesZh'
	}, {
		name: 'partCode'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'plmPartType'
	}, {
		name: 'referPartCode'
	}, {
		name: 'sapNote'
	}, {
		name: 'seriesCode'
	}, {
		name: 'seriesName'
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
		name: 'splCode'
	}, {
		name: 'splName'
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'taskStatusCode'
	}, {
		name: 'taskStatusName'
	}]
});