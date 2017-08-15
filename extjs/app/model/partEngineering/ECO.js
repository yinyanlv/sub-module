Ext.define('App.model.partEngineering.ECO', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'code'
	}, {
		name: 'owner'
	}, {
		name: 'createdDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'requester'
	}, {
		name: 'supplier'
	}, {
		name: 'affectedSubject'
	}, {
		name: 'changeScheme'
	}, {
		name: 'changeReason'
	}, {
		name: 'affectedProject'
	}, {
		name: 'affectedConfiguration'
	}, {
		name: 'affectedFactory'
	}, {
		name: 'affectedOrganization'
	}, {
		name: 'releaseDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'ecrForecastBreakpoint',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}]
});