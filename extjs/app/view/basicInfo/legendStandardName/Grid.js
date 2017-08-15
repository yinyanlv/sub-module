Ext.define('App.view.basicInfo.legendStandardName.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendstandardnamegrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.basicInfo.LegendStandardName',
    controlButtons: ['update', 'destroy', 'view-fna', 'export-fna'],
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
        iconCls: 'x-fa fa-edit',
        text: '查看包含FNA',
        tooltip: '查看包含FNA',
        action: 'view-fna',
        disabled: true,
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-trash-o',
        text: '删除',
        tooltip: '删除',
        action: 'destroy',
        disabled: true,
        singleSelectEnable: false,
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
        exportUrl: App.globalConfig.path + '/legend-standard-name/export'
    }, {
        xtype: 'button',
        text: '导出FNA关系数据',
        action: 'export-fna',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        disabled: true,
        singleSelectEnable: false
    }],
    columns: [{
        text: '图例标准名称编码',
        dataIndex: 'code',
        width: 140
    }, {
        text: '图例标准中文名称',
        dataIndex: 'nameZh',
        width: 160
    }, {
        text: '图例标准英文名称',
        dataIndex: 'nameEn',
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