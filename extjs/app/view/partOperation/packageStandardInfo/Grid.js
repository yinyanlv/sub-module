Ext.define('App.view.partOperation.packageStandardInfo.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.packagestandardinfogrid',
    rownumberer: true,
    multiSelectCheckbox: true,
    fastOpenEditDialog: true,
    store: 'App.store.partOperation.PackageStandardInfo',
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
        exportUrl: App.globalConfig.path + '/package-standard/export'
    }],
    columns: [{
        text: '包装规范编码',
        dataIndex: 'code',
        width: 140
    }, {
        text: '包装规范描述',
        dataIndex: 'name',
        width: 160
    }, {
        text: '包装规范示意图',
        dataIndex: 'photoOriginalFilename',
        width: 140
    }, {
        xtype: 'actioncolumn',
        width: 35,
        items: [{
            tooltip: '查看包装规范示意图',
            icon: App.globalConfig.path + '/styles/images/picture_view.png',
            handler: function (grid, rowIdx, colIdx, that, e, rec) {
                var me = this,
                    photoUltimatelyFilename = rec.get('photoUltimatelyFilename'),
                    config = {
                        url: App.globalConfig.packageImgResPrefix + photoUltimatelyFilename,
                        nopicPath: App.globalConfig.path + '/styles/images',
                        noImgFile: 'no_img.png'
                    },
                    photoOriginalFilename = rec.get('photoOriginalFilename');

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
        width: 100
    }, {
        text: '创建时间',
        dataIndex: 'createdDate',
        width: 140
    }, {
        text: '修改人',
        dataIndex: 'modifiedBy',
        width: 100
    }, {
        text: '修改时间',
        dataIndex: 'modifiedDate',
        width: 140
    }]
});