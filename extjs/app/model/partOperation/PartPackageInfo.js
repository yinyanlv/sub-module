Ext.define('App.model.partOperation.PartPackageInfo', {
	extend: 'App.model.common.Base',
	fields: [{
		name: 'code'
	}, {
		name: 'dealerMoq'
	}, {
		name: 'height'
	}, {
		name: 'isRushOrderPartCode'
	}, {
		name: 'isRushOrderPartName'
	}, {
		name: 'length'
	}, {
		name: 'material'
	}, {
		name: 'middleWarehouseMoq'
	}, {
		name: 'mpq'
	}, {
		name: 'nameEn'
	}, {
		name: 'nameZh'
	}, {
		name: 'packageEngineerCode'
	}, {
		name: 'packageEngineerName'
	}, {
		name: 'packageMaterialCode'
	}, {
		name: 'packageMaterialDescription'
	}, {
		name: 'packageMaterialHeight'
	}, {
		name: 'packageMaterialLength'
	}, {
		name: 'packageMaterialType'
	}, {
		name: 'packageMaterialWidth'
	}, {
		name: 'packageModifiedBy'
	}, {
		name: 'packageModifiedDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name]);
		}
	}, {
		name: 'packageStandardCode'
	}, {
		name: 'packageStandardPhotoOriginalFilename'
	}, {
		name: 'packageStandardPhotoUltimatelyFilename'
	}, {
		name: 'plmUnit'
	}, {
		name: 'plmWeight'
	}, {
		name: 'purchaseDemandDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'purchaseDemandName'
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
		name: 'sapWeight'
	}, {
		name: 'servicePolicyDetermineDate',
		mapping: function(data) {
			return Ext.util.Format.localDate(data[this.name], 'Y-m-d');
		}
	}, {
		name: 'servicePolicyName'
	}, {
		name: 'standard'
	}, {
		name: 'supplierCode'
	}, {
		name: 'supplierContact'
	}, {
		name: 'supplierMoq'
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
	}, {
		name: 'width'
	}]
});