Ext.define('App.model.partEngineering.StructConfirmTask', {
  extend: 'App.model.common.Base',
  fields: [{
    name: 'id'
  }, {
    name: 'partCode'
  }, {
    name: 'partNameZh'
  }, {
    name: 'partNameEn'
  }, {
    name: 'parentPartCode'
  }, {
    name: 'parentPartNameZh'
  }, {
    name: 'parentPartNameEn'
  }, {
    name: 'spl'
  }, {
    name: 'splName'
  }, {
    name: 'source'
  }, {
    name: 'isInheritanceStructureCode'
  }, {
    name: 'isInheritanceStructureName'
  }, {
    name: 'isConfirm'
  }, {
    name: 'isConfirmName'
  }, {
    name: 'isAdopt'
  }, {
    name: 'isAdoptName'
  }, {
    name: 'confirmBy'
  }, {
    name: 'confirmDate',
    convert: function(val) {
      return Ext.util.Format.localDate(val);
    }
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