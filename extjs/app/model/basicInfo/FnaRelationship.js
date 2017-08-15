Ext.define('App.model.basicInfo.FnaRelationship', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'code'
	}, {
		name: 'noteEn'
	}, {
		name: 'noteZh'
	}, {
		name: 'scode'
	}, {
		name: 'snoteEn'
	}, {
		name: 'snoteZh'
	}, {
		name: 'taskStatusName'
	}, {
		name: "taskFinishDate",
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}]
});