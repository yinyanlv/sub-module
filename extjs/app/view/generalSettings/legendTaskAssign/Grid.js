Ext.define('App.view.generalSettings.legendTaskAssign.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendtaskassigngrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.generalSettings.LegendTaskAssign',
    controlButtons: ['update', 'batch-update-spl'],
    tbar: [{
        iconCls: 'x-fa fa-refresh',
        text: '刷新数据',
        action: 'refresh-data',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '修改',
        action: 'update',
        singleSelectEnable: true,
        disabled: true,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '批量修改SPL',
        action: 'batch-update-spl',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'iconfont icon-import',
        text: '批量导入SPL',
        action: 'batch-import',
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/legend-task-allocation/export'
    }],
    columns: [{
        text: '品牌',
        dataIndex: 'brandName',
        width: 140
    }, {
        text: '车系',
        dataIndex: 'seriesName',
        width: 140
    }, {
        text: '图例分组',
        dataIndex: 'legendGroupNoteZh',
        width: 140
    }, {
        text: 'SPL',
        dataIndex: 'splName',
        width: 140
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