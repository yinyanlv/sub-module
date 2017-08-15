Ext.define('App.model.releaseControl.EndPurchaseRequireTask', {
  extend: 'App.model.common.Base',
  fields: [{
    name: 'partCode'
  }, {
    name: 'partNameZh'
  }, {
    name: 'partNameEn'
  }, {
    name: 'servicePolicyCode'
  }, {
    name: 'servicePolicyName'
  }, {
    name: 'servicePolicyModifiedDate',
    mapping: function(data) {
      return Ext.util.Format.localDate(data.servicePolicyModifiedDate);
    }
  }, {
    name: 'validityPeriod'
  }, {
    name: 'supersessionTypeCode'
  }, {
    name: 'supersessionTypeName'
  }, {
    name: 'treatmentProposalCode'
  }, {
    name: 'treatmentProposalName'
  }, {
    name: 'newPartCode'
  }, {
    name: 'purchaseEngineerCode'
  }, {
    name: 'purchaseEngineerName'
  }, {
    name: 'purchaseDemandCode'
  }, {
    name: 'purchaseDemandName'
  }, {
    name: 'purchaseStatusCode'
  }, {
    name: 'purchaseStatusName'
  }, {
    name: 'purchaseStatusModifiedDate',
    mapping: function(data) {
      return Ext.util.Format.localDate(data.purchaseStatusModifiedDate);
    }
  }, {
    name: 'salesStatusCode'
  }, {
    name: 'salesStatusName'
  }, {
    name: 'salesStatusModifiedDate',
    mapping: function(data) {
      return Ext.util.Format.localDate(data.salesStatusModifiedDate);
    }
  }, {
    name: 'createdDate',
    mapping: function(data) {
      return Ext.util.Format.localDate(data.createdDate);
    }
  }, {
    name: 'supplierCode'
  }, {
    name: 'supplierPartCode'
  }, {
    name: 'supplierName'
  }, {
    name: 'supplierTele'
  }, {
    name: 'supplierContact'
  }]
});