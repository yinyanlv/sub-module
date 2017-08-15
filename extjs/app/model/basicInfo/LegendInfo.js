Ext.define('App.model.basicInfo.LegendInfo', {
    extend: 'App.model.common.Base',
    fields: [{
        name: 'code'
    }, {
        name: 'groupCode'
    }, {
        name: 'groupName'
    }, {
        name: 'legendStandardCode'
    }, {
        name: 'legendStandardNameEn'
    }, {
        name: 'legendStandardNameZh'
    }, {
        name: 'legendStandardName',
        mapping: function(data) {

            return (data.legendStandardCode || '' ) + '_' + (data.legendStandardNameZh || '' ) + '_' + (data.legendStandardNameEn || '' );
        }
    }, {
        name: 'nameEn'
    }, {
        name: 'nameZh'
    }, {
        name: 'note'
    }, {
        name: 'photoOriginalFilename'
    }, {
        name: 'photoUltimatelyFilename'
    }, {
        name: 'photoThumbnailFilename'
    }]
});