Ext.define('App.model.generalSettings.UserManage', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'code'
	}, {
		name: 'name'
	}, {
		name: 'typeCodes',
		mapping: function(data) {
			var codes = [];

			Ext.each(data.userTypes, function(item) {
				codes.push(item.code);
			});

			return codes;
		}
	}, {
		name: 'typeNames',
		mapping: function(data) {
			var names = [];

			Ext.each(data.userTypes, function(item) {
				names.push(item.name);
			});

			return names.join(',');
		}
	}, {
		name: 'note'
	}]
});