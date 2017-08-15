Ext.define('App.view.basicInfo.legendGroup.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.legendgroupgrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.basicInfo.LegendGroup',
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
        exportUrl: App.globalConfig.path + '/legend-group/export'
    }],
    columns: [{
        text: '图例分组编码',
        dataIndex: 'code',
        width: 140
    }, {
        text: '图例分组中文描述',
        dataIndex: 'noteZh',
        width: 150
    }, {
        text: '图例分组英文描述',
        dataIndex: 'noteEn',
        width: 150
    }, {
        text: '缩略图',
        dataIndex: 'thumbnailOriginalName',
        width: 140
    }, {
        xtype: 'actioncolumn',
        width: 35,
        items: [{
            tooltip: '查看缩略图',
            icon: App.globalConfig.path + '/styles/images/picture_view.png',
            handler: function (grid, rowIdx, colIdx, that, e, rec) {
                var me = this,
                    photoUltimatelyFilename = rec.get('thumbnailUltimatelyName'),
                    config = {
                        url: App.globalConfig.legendGroupImgRestPrefix + photoUltimatelyFilename,
                        nopicPath: App.globalConfig.path + '/styles/images',
                        noImgFile: 'no_img.png'
                    },
                    photoOriginalFilename = rec.get('thumbnailOriginalName');

                if (photoOriginalFilename && /(\.jpg)$|(\.jpeg)$|(\.bmp)$|(\.png)$|(\.gif)$/i.test(photoOriginalFilename)) {
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