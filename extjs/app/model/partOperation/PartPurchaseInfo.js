Ext.define('App.model.partOperation.PartPurchaseInfo', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'code'
	}, {
		name: 'nameEn'
	}, {
		name: 'nameZh'
	}, {
		name: 'purchaseDemandDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'purchaseDemandName'
	}, {
		name: 'purchaseEngineerCode'
	}, {
		name: 'purchaseEngineerName'
	}, {
		name: 'purchaseModifiedBy'
	}, {
		name: 'purchaseModifiedDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'purchaseStatusName'
	}, {
		name: 'purchaseStatusSyncDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'salesStatusName'
	}, {
		name: 'salesStatusSyncDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'servicePolicyDetermineDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'servicePolicyName'
	}, {
		name: 'supplierCode'
	}, {
		name: 'supplierContact'
	}, {
		name: 'supplierName'
	}, {
		name: 'supplierPartCode'
	}, {
		name: 'supplierTele'
	}, {
		name: 'validityPeriod',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}]
});