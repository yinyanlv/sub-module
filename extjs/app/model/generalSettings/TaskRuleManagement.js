Ext.define('App.model.generalSettings.TaskRuleManagement', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'brandCode'
	}, {
		name: 'brandName'
	}, {
		name: 'pkgCode'
	}, {
		name: 'pkgName'
	}, {
		name: 'seriesCode'
	}, {
		name: 'seriesName'
	}, {
		name: 'smtCode'
	}, {
		name: 'smtName'
	}, {
		name: 'upcfnaCode'
	}, {
		name: 'upcfnaNoteZh'
	}, {
		name: 'upcfnaNoteEn'
	}, {
		name: 'splCode'
	}, {
		name: 'splName'
	}, {
		name: 'sppCode'
	}, {
		name: 'sppName'
	}, {
		name: 'steCode'
	}, {
		name: 'steName'
	}, {
		name: 'createdBy'
	}, {
		name: 'createdDate',
		convert: function(val) {
			return Ext.util.Format.localDate(val);
		}
	}, {
		name: 'modifiedBy'
	}, {
		name: 'modifiedDate',
		convert: function(val) {
			return Ext.util.Format.localDate(val);
		}
	}]
});