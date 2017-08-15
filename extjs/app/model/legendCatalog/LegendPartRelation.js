Ext.define('App.model.legendCatalog.LegendPartRelation', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'callout'
	}, {
		name: 'calloutSupcfnaCode'
	}, {
		name: 'calloutSupcfnaNoteEn'
	}, {
		name: 'calloutSupcfnaNoteZh'
	}, {
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'legendCode'
	}, {
		name: 'partCode'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'recommendCallout'
	}, {
		name: 'rootPartCode'
	}, {
		name: 'rpo'
	}, {
		name: 'servicePolicyCode'
	}, {
		name: 'servicePolicyName'
	}, {
		name: 'splNote'
	}, {
		name:'structureNote'
	},{
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'supcfnaCode'
	}, {
		name: 'supcfnaNoteEn'
	}, {
		name: 'supcfnaNoteZh'
	}, {
		name: 'usageNote'
	}]
});