Ext.define('App.view.legendCatalog.legendTaskDetail.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendtaskdetailgrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.legendCatalog.LegendTaskDetail',
    controlButtons: ['attach-legend', 'batch-ensure', 'similar-legend'],
    tbar: [{
        iconCls: 'x-fa fa-edit',
        text: '系统自动配图',
        tooltip: '系统自动配图',
        action: 'auto-assign',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '挂靠图例',
        tooltip: '挂靠图例',
        action: 'attach-legend',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '相似图例',
        tooltip: '相似图例',
        disabled: true,
        singleSelectEnable: false,
        action: 'similar-legend',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '确认系统推荐配图',
        tooltip: '确认系统推荐配图',
        action: 'batch-ensure',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '未配图用法导出',
        tooltip: '未配图用法导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/legend/task-detail/export-non-legend-usage'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '查看自动配图记录',
        tooltip: '查看自动配图记录',
        action: 'view-assign-history',
        ui: 'grid-toolbar'
    }],
    columns: [{
        text: '配件编码',
        dataIndex: 'partCode',
        width: 140,
        locked: true
    }, {
        text: '售后FNA',
        dataIndex: 'fnaNameZh',
        width: 140,
        locked: true
    }, {
        text: '一级总成件编码',
        dataIndex: 'rootPartCode',
        width: 140,
        locked: true
    }, {
        text: '配件中文名称',
        dataIndex: 'partNameZh',
        width: 160
    }, {
        text: '配件英文名称',
        dataIndex: 'partNameEn',
        width: 160
    }, {
        text: '功能名称位置中文描述',
        dataIndex: 'fnaNameZh',
        width: 160
    }, {
        text: '功能名称位置英文描述',
        dataIndex: 'fnaNameEn',
        width: 160
    }, {
        text: '图例编码',
        dataIndex: 'legendCode',
        width: 120
    }, {
        text: '图内序号',
        dataIndex: 'callout',
        width: 100
    }, {
        text: '系统推荐图例',
        dataIndex: 'recommendLegendCodes',
        width: 140,
        sortable: false
    }, {
        text: '系统推荐图内序号',
        dataIndex: 'recommendCallouts',
        width: 120,
        sortable: false
    }, {
        text: '维修策略',
        dataIndex: 'servicePolicyCode',
        width: 120
    }, {
        text: '配置',
        dataIndex: 'rpoName',
        width: 120
    }, {
        text: '用量',
        dataIndex: 'qty',
        width: 100
    }, {
        text: '生效日期',
        dataIndex: 'startDate',
        width: 140
    }, {
        text: '失效日期',
        dataIndex: 'endDate',
        width: 140
    }, {
        text: '用法备注',
        dataIndex: 'usageNote',
        width: 160
    }, {
        text: '配件备注（SPL）',
        dataIndex: 'splNote',
        width: 160
    }]
});