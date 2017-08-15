Ext.define('App.model.common.Base', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'modifiedBy'
	}, {
		name: "modifiedDate",
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'createdBy'
	}, {
		name: "createdDate",
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}]
});