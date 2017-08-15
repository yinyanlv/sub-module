Ext.define('App.controller.legendCatalog.LegendHotpointUsage', {
    extend: 'Ext.ux.controller.CRUD',
    controllerReady: function () {
        var me = this;

        me.bindEvents();
    },

    bindEvents: function () {
        var me = this,
            grid = me.getGrid();

        grid.on('toolbarclick', function (that) {
            var action = that.action;

            switch (action) {
                case 'update-legend-usage':
                    me.openUpdateLegendUsage();
                    break;
                case 'batch-import':
                    me.openImportDialog();
                    break;
                case 'copy':
                    me.openCopyDialog();
                    break;
                case 'export-no-hot-point-legend':
                    me.exportNoHotPointLegend();
                    break;
                default:
                    break;
            }
        });
    },

    openUpdateLegendUsage: function () {
        var me = this,
            dialog,
            params = me.getGridSelection()[0];

        dialog = Ext.create('App.view.legendCatalog.legendHotpointUsage.LegendUsageEdit', {
            autoShow: true,
            params: params
        });

        dialog.on('updatefinished', function() {
            me.readRecord();
        });
    },

    openImportDialog: function () {
        var me = this,
            dialog = Ext.create('App.view.common.window.UploadImportFile', {
                title: '批量导入图例热点用法',
                autoShow: true,
                uploadUrl: App.globalConfig.path + '/legend/callout-fna-manage/import-excel',
                tplUrl: App.globalConfig.resPrefix + '/template/图例热点用法管理-导入模板.xlsx'
            });

        dialog.on('uploadsuccess', function (result) {
            Ext.Msg.alert('提示', '导入成功');

            me.readRecord();
        });
    },

    openCopyDialog: function () {
        var me = this,
            params = me.getGridSelection()[0],
            className = 'App.view.legendCatalog.legendHotpointUsage.Copy',
            dialog = Ext.create(className, {
                params: params,
                autoShow: true
            });

        dialog.on('updatefinished', function() {
            me.readRecord();
        });
    },

    exportNoHotPointLegend: function () {
        var me = this;

        window.open(encodeURI(App.globalConfig.path + '/legend/callout-fna-manage/export-without-fna?args={"filters":[],"sorts":[],"paging":{"page":1,"size":20}}'));
    }
});