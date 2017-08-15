Ext.define('App.model.partUsage.RepeatUsageTask', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'endDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'parentPartCode'
	}, {
		name: 'parentPartNameEn'
	}, {
		name: 'parentPartNameZh'
	}, {
		name: 'parentPartSupcfnaCode'
	}, {
		name: 'parentPartSupcfnaNoteEn'
	}, {
		name: 'parentPartSupcfnaNoteZh'
	}, {
		name: 'partCode'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'servicePolicyCode'
	}, {
		name: 'servicePolicyName'
	}, {
		name: 'splCode'
	}, {
		name: 'splName'
	}, {
		name: 'supcfnaCode'
	}, {
		name: 'supcfnaNoteEn'
	}, {
		name: 'supcfnaNoteZh'
	}, {
		name: 'taskStatusCode'
	}, {
		name: 'taskStatusName'
	}, {
		name: 'startDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}]
});