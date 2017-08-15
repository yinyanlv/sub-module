Ext.define('App.model.partEngineering.ServiceKit', {
    extend: 'App.model.common.Base',
    fields: [{
        name: 'code'
    }, {
        name: 'deletedCode'
    }, {
        name: 'deletedName'
    }, {
        name: 'nameEn'
    }, {
        name: 'nameZh'
    }, {
        name: 'note'
    }, {
        name: 'parentPartCodes'
    }, {
        name: 'parentPartNameEns'
    }, {
        name: 'parentPartNameZhs'
    }, {
        name: 'purchaseDemandCode'
    }, {
        name: 'purchaseDemandName'
    }, {
        name: 'purchaseStatusCode'
    }, {
        name: 'purchaseStatusName'
    }, {
        name: 'salesStatusCode'
    }, {
        name: 'salesStatusName'
    }, {
        name: 'servicePolicyCode'
    }, {
        name: 'servicePolicyName'
    }, {
        name: 'createdBy'
    }, {
        name: 'createdDate',
        convert: function (val) {
            return Ext.util.Format.localDate(val);
        }
    }, {
        name: 'modifiedBy'
    }, {
        name: 'modifiedDate',
        convert: function (val) {
            return Ext.util.Format.localDate(val);
        }
    }]
});