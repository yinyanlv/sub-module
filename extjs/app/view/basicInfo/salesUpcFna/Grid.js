Ext.define('App.view.basicInfo.salesUpcFna.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.salesupcfnagrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.basicInfo.SalesUpcFna',
    controlButtons: ['update', 'destroy'],
    tbar: [{
        iconCls: 'x-fa fa-plus-square-o',
        tooltip: '新增',
        text: '新增',
        action: 'create',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '修改',
        tooltip: '修改',
        action: 'update',
        disabled: true,
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-trash-o',
        text: '删除',
        tooltip: '删除',
        action: 'destroy',
        disabled: true,
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导入',
        action: 'import',
        iconCls: 'iconfont icon-import',
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/supcfna/export'
    }],
    columns: [{
        text: '售后FNA',
        dataIndex: 'code',
        width: 100
    }, {
        text: '功能名称位置中文描述',
        dataIndex: 'noteZh',
        width: 150
    }, {
        text: '功能名称位置英文描述',
        dataIndex: 'noteEn',
        width: 150
    }, {
        text: '图例分组',
        dataIndex: 'legendGroupNoteZh',
        width: 160
    }, {
        text: '推荐维修策略',
        dataIndex: 'servicePolicyName',
        width: 160
    }, {
        text: '图例标准名称编码',
        dataIndex: 'legendStandardNameCode',
        width: 160
    }, {
        text: '图例标准名称（中文）',
        dataIndex: 'legendStandardNameNameZh',
        width: 160
    }, {
        text: '创建人',
        dataIndex: 'createdBy',
        width: 120
    }, {
        text: '创建时间',
        dataIndex: 'createdDate',
        width: 140
    }, {
        text: '修改人',
        dataIndex: 'modifiedBy',
        width: 120
    }, {
        text: '修改时间',
        dataIndex: 'modifiedDate',
        width: 140
    }]
});