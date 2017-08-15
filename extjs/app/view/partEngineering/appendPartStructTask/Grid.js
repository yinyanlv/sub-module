Ext.define('App.view.partEngineering.appendPartStructTask.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.appendpartstructtaskgrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.partEngineering.AppendPartStructTask',
    controlButtons: ['batch-complete', 'attach-series'],
    tbar: [{
        iconCls: 'x-fa fa-edit',
        text: '批量完成',
        tooltip: '批量完成',
        action: 'batch-complete',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-plus-square-o',
        tooltip: '新增结构',
        text: '新增结构',
        action: 'create-struct',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '维护生产件对应关系',
        tooltip: '维护生产件对应关系',
        action: 'maintenance-relationship',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '直接挂靠车系',
        tooltip: '直接挂靠车系',
        action: 'attach-series',
        disabled: true,
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/new-part-structure/export'
    }],
    columns: [{
        text: '配件编码',
        dataIndex: 'partCode',
        locked: true,
        width: 140
    }, {
        text: '操作',
        locked: true,
        align: 'center',
        width: 140,
        renderer: function(data, metadata, record) {
            var html = [],
                code = record.get('partCode'),
                statusCode = record.get('taskStatusCode'),
                partUrl = App.globalConfig.path + '/part/detail-page/' + code;

            if (statusCode === 0) {
                html.push('<a href="javascript:void(0);" data-action="complete"  class="btn-tb-link-small">完成</a>');
            }
            html.push('<a href="' + partUrl + '" data-action="part" target="_blank" class="btn-tb-link-small">Part</a>');

            return html.join('&nbsp;&nbsp;');
        }
    }, {
        text: '配件中文名称',
        dataIndex: 'partNameZh',
        width: 160
    }, {
        text: '配件英文名称',
        dataIndex: 'partNameEn',
        width: 160
    }, {
        text: '配件备注(DRE)',
        dataIndex: 'description',
        width: 160
    }, {
        text: '配件类型(PLM)',
        dataIndex: 'plmPartType',
        width: 120
    }, {
        text: '配件备注(STE)',
        dataIndex: 'afterSaleNote',
        width: 160
    }, {
        text: '配件备注(SAP)',
        dataIndex: 'sapNote',
        width: 160
    }, {
        text: '维修策略',
        dataIndex: 'servicePolicyName',
        width: 100
    }, {
        text: '维修件类型',
        dataIndex: 'servicePartTypeName',
        width: 100
    }, {
        text: '维修支持类型',
        dataIndex: 'serviceSupportTypeName',
        width: 100
    }, {
        text: '父配件编码',
        dataIndex: 'parentPartCodes',
        width: 140
    }, {
        text: '父配件中文名称',
        dataIndex: 'parentPartNamesZh',
        width: 160
    }, {
        text: '父配件英文名称',
        dataIndex: 'parentPartNamesEn',
        width: 160
    }, {
        text: '售后专用件对应生产件',
        dataIndex: 'referPartCode',
        width: 140
    }, {
        text: '直接挂靠的车系',
        dataIndex: 'seriesName',
        width: 140
    }, {
        text: '任务创建日期',
        dataIndex: 'startDate',
        width: 140
    }, {
        text: '任务状态',
        dataIndex: 'taskStatusName',
        width: 100
    }, {
        text: '任务结束日期',
        dataIndex: 'endDate',
        width: 140
    }, {
        text: 'SPL',
        dataIndex: 'splName',
        width: 120
    }]
});