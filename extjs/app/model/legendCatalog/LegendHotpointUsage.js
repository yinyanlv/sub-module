Ext.define('App.model.legendCatalog.LegendHotpointUsage', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'callout'
	}, {
		name: 'legendCode'
	}, {
		name: 'legendNameEn'
	}, {
		name: 'legendNameZh'
	}, {
		name: 'legendName',
		mapping: function(data) {

			return (data.legendNameZh || '' ) + '_' + (data.legendNameEn || '' );
		}
	}, {
		name: 'standardCode'
	}, {
		name: 'standardNameEn'
	}, {
		name: 'standardNameZh'
	}, {
		name: 'standardName',
		mapping: function(data) {

			return (data.standardNameZh || '' ) + '_' + (data.standardNameEn || '' );
		}
	}, {
		name: 'supcfnaCode'
	}, {
		name: 'supcfnaNoteEn'
	}, {
		name: 'supcfnaNoteZh'
	}, {
		name: 'usageIsNull'
	}]
});