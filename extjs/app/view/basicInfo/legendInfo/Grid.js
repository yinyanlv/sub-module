Ext.define('App.view.basicInfo.legendInfo.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendinfogrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.basicInfo.LegendInfo',
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
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }, {
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/legend-file/export'
    }],
    columns: [{
        text: '图例编码',
        dataIndex: 'code',
        locked: true,
        width: 140
    }, {
        text: '图例中文名称',
        dataIndex: 'nameZh',
        width: 160
    }, {
        text: '图例英文名称',
        dataIndex: 'nameEn',
        width: 160
    }, {
        text: '所属图例分组',
        dataIndex: 'groupName',
        width: 160
    }, {
        text: '图例标准名称编码',
        dataIndex: 'legendStandardCode',
        width: 140
    }, {
        text: '图例标准中文名称',
        dataIndex: 'legendStandardNameZh',
        width: 160
    }, {
        text: '图例标准英文名称',
        dataIndex: 'legendStandardNameEn',
        width: 160
    }, {
        text: '图文件名',
        dataIndex: 'photoOriginalFilename',
        width: 140
    }, {
        xtype: 'actioncolumn',
        width: 35,
        items: [{
            tooltip: '查看缩略图',
            icon: App.globalConfig.path + '/styles/images/picture_view.png',
            handler: function(grid, rowIdx, colIdx, that, e, rec) {
                var me = this,
                    photoUltimatelyFilename = rec.get('photoUltimatelyFilename'),
                    url = App.globalConfig.legendImgRestPrefix + photoUltimatelyFilename,
                    photoOriginalFilename = rec.get('photoOriginalFilename');

                Ext.create('App.view.basicInfo.legendInfo.SvgViewer', {
                    autoShow: true,
                    url: url
                });
            }
        }]
    }, {
        text: '图例备注',
        dataIndex: 'note',
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