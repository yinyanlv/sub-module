Ext.define('App.view.legendCatalog.legendPartRelation.LegendInfo', {
    extend: 'Ext.form.Panel',
    alias: 'widget.legendpartrelationlegendinfo',
    ui: 'grid',
    title: '<span class="vertical-line">图例信息</span>',
    header: {
        style: 'border-bottom:1px solid #EAEDF1 !important;'
    },
    bodyPadding: '5 10 5 10',
    layout: 'column',
    border: false,
    defaults: {
        xtype: 'textfield',
        margin: '5 15 0 0',
        labelWidth: 100,
        readOnly: true
    },
    items: [{
        fieldLabel: '图列名称',
        name: 'nameZh'
    }, {
        fieldLabel: '图例分组',
        name: 'groupName'
    }, {
        fieldLabel: '图例备注',
        name: 'note'
    }, {
        fieldLabel: '图例标准名称编码',
        name: 'legendStandardCode'
    }, {
        fieldLabel: '图例标准名称',
        name: 'legendStandardNameZh'
    }, {
        fieldLabel: '图文件名',
        name: 'photoOriginalFilename'
    }]
});