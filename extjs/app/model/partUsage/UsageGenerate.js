Ext.define('App.model.partUsage.UsageGenerate', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'brandCode'
	}, {
		name: 'brandName'
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'hasMultipleUsageCode'
	}, {
		name: 'hasMultipleUsageName'
	}, {
		name: 'partCode'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'qty'
	}, {
		name: 'rpo'
	}, {
		name: 'seriesCode'
	}, {
		name: 'seriesName'
	}, {
		name: 'smtCode'
	}, {
		name: 'splCode'
	}, {
		name: 'splName'
	}, {
		name: 'splName'
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'supcfnaCode'
	}, {
		name: 'usageNote'
	}, {
		name: 'rootPartCode'
	}, {
		name: 'usageStatusCode'
	}, {
		name: 'usageStatusName'
	}]
});