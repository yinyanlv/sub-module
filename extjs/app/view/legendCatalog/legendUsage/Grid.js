Ext.define('App.view.legendCatalog.legendUsage.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendusagegrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.legendCatalog.LegendUsage',
    controlButtons: ['destroy'],
    destroyKeys: ['seriesCode', 'legendCode'],
    tbar: [{
        iconCls: 'x-fa fa-plus-square-o',
        tooltip: '新增',
        text: '新增',
        action: 'create',
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
        exportUrl: App.globalConfig.path + '/legend-usage-manage/export'
    }],
    columns: [{
        text: '品牌',
        dataIndex: 'brandName',
        locked: true,
        width: 120
    }, {
        text: '车系',
        dataIndex: 'seriesName',
        locked: true,
        width: 120
    }, {
        text: '图例编码',
        dataIndex: 'legendCode',
        locked: true,
        width: 140
    }, {
        text: '图例中文名称',
        dataIndex: 'legendNameZh',
        width: 160
    }, {
        text: '图例英文名称',
        dataIndex: 'legendNameEn',
        width: 160
    }, {
        text: '图例标准名称编码',
        dataIndex: 'legendStandardNameCode',
        width: 140
    }, {
        text: '图例标准中文名称',
        dataIndex: 'legendStandardNameNameZh',
        width: 160
    }, {
        text: '图例标准英文名称',
        dataIndex: 'legendStandardNameNameEn',
        width: 160
    }, {
        text: '图例分组',
        dataIndex: 'legendGroupNoteZh',
        width: 160
    }, {
        text: '图文件名称',
        dataIndex: 'photoOriginalFilename',
        width: 140
    }, {
        xtype: 'actioncolumn',
        width: 35,
        items: [{
            tooltip: '查看缩略图',
            icon: App.globalConfig.path + '/styles/images/picture_view.png',
            handler: function (grid, rowIdx, colIdx, that, e, rec) {
                var me = this,
                    photoUltimatelyFilename = rec.get('photoUltimatelyFilename'),
                    config = {
                        url: App.globalConfig.legendImgRestPrefix + photoUltimatelyFilename,
                        nopicPath: App.globalConfig.path + '/styles/images',
                        noImgFile: 'no_img.png'
                    },
                    photoOriginalFilename = rec.get('photoOriginalFilename');

                if (photoOriginalFilename && /(\.jpg)$|(\.jpeg)$|(\.bmp)$|(\.png)$|(\.gif)$|(\.svg)$/i.test(photoOriginalFilename)) {
                    Ext.create('Ext.ux.component.window.ImageViewer', config).show();
                } else {
                    if (photoUltimatelyFilename) {
                        window.open(config.url);
                    } else {
                        Ext.create('Ext.ux.component.window.ImageViewer', config).show();
                    }
                }
            }
        }]
    }, {
        text: '图例备注',
        dataIndex: 'legendNote',
        width: 160
    }, {
        text: '创建人',
        dataIndex: 'createdBy',
        width: 120
    }, {
        text: '创建时间',
        dataIndex: 'createdDate',
        width: 140
    }]
});