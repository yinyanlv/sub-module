Ext.define('App.view.partEngineering.partPhoto.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.partphotogrid',
    store: 'App.store.partEngineering.PartPhoto',
    multiSelectCheckbox: true,
    controlButtons: ['update', 'destroy'],
    destroyKeys: ['id'],
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
        singleSelectEnable: true,
        ui: 'grid-toolbar'
    }],
    columns: [{
        text: '配件编码',
        dataIndex: 'partCode',
        width: 140
    }, {
        text: '配件中文名称',
        dataIndex: 'partNameZh',
        width: 140
    }, {
        text: '配件英文名称',
        dataIndex: 'partNameEn',
        width: 140
    }, {
        text: '配件备注(DRE)',
        dataIndex: 'partDescription',
        width: 160
    }, {
        text: '配件照片文件名',
        dataIndex: 'photoOriginalFilename',
        width: 140
    }, {
        xtype: 'actioncolumn',
        width: 35,
        items: [{
            tooltip: '查看配件照片',
            icon: App.globalConfig.path + '/styles/images/picture_view.png',
            handler: function(grid, rowIdx, colIdx, that, e, rec) {
                var me = this,
                    photoUltimatelyFilename = rec.get('photoUltimatelyFilename'),
                    config = {
                        url: App.globalConfig.partImgResPrefix + photoUltimatelyFilename,
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