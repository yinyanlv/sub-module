Ext.define('App.model.partEngineering.ServiceInfoPendingQuery', {
  extend: 'Ext.data.Model',
  fields: [{
      name: 'createdBy'
    }, {
      name: 'createdDate',
      mapping: function(data) {
        return Ext.util.Format.localDate(data.createdDate);
      }
    }, {
      name: 'ecrAffectedConfiguration'
    }, {
      name: 'ecrAffectedFactory'
    }, {
      name: 'ecrAffectedOrganization'
    }, {
      name: 'ecrAffectedProject'
    }, {
      name: 'ecrAffectedSubject'
    }, {
      name: 'ecrChangeReason'
    }, {
      name: 'ecrChangeScheme'
    }, {
      name: 'ecrCode'
    }, {
      name: 'ecrCreatedDate',
      mapping: function(data) {
        return Ext.util.Format.localDate(data.ecrCreatedDate);
      }
    }, {
      name: 'ecrOwner'
    }, {
      name: 'ecrReleaseDate',
      mapping: function(data) {
        return Ext.util.Format.localDate(data.ecrReleaseDate);
      }
    }, {
      name: 'ecrRequester'
    }, {
      name: 'ecrSupplier'
    }, {
      name: 'modifiedBy'
    }, {
      name: 'modifiedDate',
      mapping: function(data) {
        return Ext.util.Format.localDate(data.modifiedDate);
      }
    }, {
      name: 'serviceDetermineNote'
    }, {
      name: 'serviceDetermineTypeCode'
    }, {
      name: 'serviceDetermineTypeName'
    }]
});