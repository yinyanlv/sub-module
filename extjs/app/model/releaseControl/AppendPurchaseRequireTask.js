Ext.define('App.model.releaseControl.AppendPurchaseRequireTask', {
  extend: 'App.model.common.Base',
  fields: [{
    name: 'partCode'
  }, {
    name: 'partNameZh'
  }, {
    name: 'partNameEn'
  }, {
    name: 'doProductionUseCode'
  }, {
    name: 'doProductionUseName'
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
    name: 'purchaseEngineerCode'
  }, {
    name: 'purchaseEngineerName'
  }, {
    name: 'purchaseDemandCode'
  }, {
    name: 'purchaseDemandName'
  }, {
    name: 'createdDate',
    mapping: function(data) {
      return Ext.util.Format.localDate(data.createdDate);
    }
  }]
});