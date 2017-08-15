Ext.define('App.model.partUsage.ProductionUpcFnaChangeLog', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'partCode'
	}, {
		name: 'partNameEn'
	}, {
		name: 'partNameZh'
	}, {
		name: 'oldUpcfnaCode'
	}, {
		name: 'oldUpcfnaNoteEn'
	}, {
		name: 'oldUpcfnaNoteZh'
	}, {
		name: 'newUpcfnaCode'
	}, {
		name: 'newUpcfnaNoteEn'
	}, {
		name: 'newUpcfnaNoteZh'
	}, {
		name: 'modifiedDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'modifiedBy'
	}]
});