Ext.define('App.view.legendCatalog.legendHotpointUsage.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendhotpointusagegrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.legendCatalog.LegendHotpointUsage',
    controlButtons: ['update-legend-usage', 'copy'],
    tbar: [{
        iconCls: 'x-fa fa-edit',
        text: '修改',
        tooltip: '修改',
        action: 'update-legend-usage',
        disabled: true,
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'iconfont icon-import',
        text: '批量导入更新',
        action: 'batch-import',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-copy',
        text: '复制',
        action: 'copy',
        disabled: true,
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/legend/callout-fna-manage/export'
    }, {
        xtype: 'button',
        text: '导出无热点用法图例',
        action: 'export-no-hot-point-legend',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar'
    }],
    columns: [{
        text: '图例编码',
        dataIndex: 'legendCode',
        width: 140,
        locked: true
    }, {
        text: '图例中文名称',
        dataIndex: 'legendNameZh',
        width: 150
    }, {
        text: '图例英文名称',
        dataIndex: 'legendNameEn',
        width: 150
    }, {
        text: '图内序号',
        dataIndex: 'callout',
        width: 100
    }, {
        text: '售后FNA',
        dataIndex: 'supcfnaCode',
        width: 120
    }, {
        text: '功能名称位置中文描述',
        dataIndex: 'supcfnaNoteZh',
        width: 160
    }, {
        text: '功能名称位置英文描述',
        dataIndex: 'supcfnaNoteEn',
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