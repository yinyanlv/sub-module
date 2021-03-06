Ext.define('App.view.partEngineering.electrophoresis.Query', {
    extend: 'Ext.ux.component.filter.Query',
    alias: 'widget.electrophoresisquery',
    items: [{
        items: [{
            fieldLabel: '配件编码',
            name: 'code'
        }, {
            fieldLabel: '配件名称',
            name: 'name'
        }, {
            fieldLabel: '原始件编码',
            name: 'originalPartCode'
        }, {
            fieldLabel: '原始件名称',
            name: 'originalPartName'
        }, {
            xtype: 'basecombo',
            fieldLabel: '电泳底漆颜色件分类',
            labelWidth: 140,
            name: 'elposPrimsColorOption',
            withAll: true,
            value: '',
            url: App.globalConfig.path + '/combo/elpos-prims-color/list'
        }, {
            fieldLabel: '创建人',
            name: 'createdBy'
        }, {
            xtype: 'datefield',
            fieldLabel: '创建时间-起',
            name: 'createdDate_S',
            format: 'Y-m-d'
        }, {
            xtype: 'datefield',
            fieldLabel: '创建时间-止',
            name: 'createdDate_E',
            format: 'Y-m-d'
        }, {
            fieldLabel: '修改人',
            name: 'modifiedBy'
        }, {
            xtype: 'datefield',
            fieldLabel: '修改时间-起',
            name: 'modifiedDate_S',
            format: 'Y-m-d'
        }, {
            xtype: 'datefield',
            fieldLabel: '修改时间-止',
            name: 'modifiedDate_E',
            format: 'Y-m-d'
        }]
    }]
});