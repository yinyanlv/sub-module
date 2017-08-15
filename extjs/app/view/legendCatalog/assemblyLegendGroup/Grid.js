Ext.define('App.view.legendCatalog.assemblyLegendGroup.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.assemblylegendgroupgrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.legendCatalog.AssemblyLegendGroup',
    controlButtons: ['update', 'batch-ensure', 'batch-update-legend-group', 'batch-update-spl'],
    tbar: [{
        iconCls: 'x-fa fa-edit',
        text: '获取一级总成件',
        tooltip: '获取一级总成件',
        action: 'get-assembly',
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
        text: '批量确认系统推荐',
        tooltip: '批量确认系统推荐',
        action: 'batch-ensure',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '批量修改图例分组',
        tooltip: '批量修改图例分组',
        action: 'batch-update-legend-group',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '批量导入图例分组',
        tooltip: '批量导入图例分组',
        action: 'batch-import-legend-group',
        iconCls: 'iconfont icon-import',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '批量修改SPL',
        tooltip: '批量修改SPL',
        action: 'batch-update-spl',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/legend/rootpart-group-manage/export'
    }],
    columns: [{
        text: '一级总成件编码',
        dataIndex: 'rootPartCode',
        width: 140,
        locked: true
    }, {
        text: '配件中文名称',
        dataIndex: 'rootPartNameZh',
        width: 160,
        locked: true
    }, {
        text: '配件英文名称',
        dataIndex: 'rootPartNameEn',
        width: 160,
        locked: true
    }, {
        text: '售后FNA',
        dataIndex: 'supcfnaCode',
        width: 120,
        locked: true
    }, {
        text: '功能名称位置中文描述',
        dataIndex: 'supcfnaNoteZh',
        width: 160
    }, {
        text: '功能名称位置英文描述',
        dataIndex: 'supcfnaNoteEn',
        width: 160
    }, {
        text: '图例分组',
        dataIndex: 'groupName',
        width: 120
    }, {
        text: '分配状态',
        dataIndex: 'statusName',
        width: 100
    }, {
        text: 'SPL',
        dataIndex: 'splName',
        width: 100
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