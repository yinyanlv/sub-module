Ext.define('App.controller.generalSettings.LegendTaskAssign', {
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
                case 'refresh-data':
                    me.refreshData();
                    break;
                case 'batch-update-spl':
                    me.openBatchUpdateSpl();
                    break;
                case 'batch-import':
                    me.openImportDialog();
                    break;
                default:
                    break;
            }
        });
    },

    openBatchUpdateSpl: function () {
        var me = this,
            params = me.getSelectionCodes(),
            className = 'App.view.generalSettings.legendTaskAssign.BatchUpdateSPL',
            dialog = Ext.create(className, {
                params: params,
                autoShow: true
            });

        dialog.on('updatefinished', function () {
            me.readRecord();
        });
    },

    openImportDialog: function () {
        var me = this,
            dialog = Ext.create('App.view.common.window.UploadImportFile', {
                title: '批量导入SPL',
                autoShow: true,
                uploadUrl: App.globalConfig.path + '/legend-task-allocation/import-excel',
                tplUrl: App.globalConfig.resPrefix + '/template/图例任务分配-导入模板.xlsx'
            });

        dialog.on('uploadsuccess', function (result) {
            Ext.Msg.alert('提示', '导入成功');

            me.readRecord();
        });
    },

    refreshData: function () {
        var me = this;

        Ext.Msg.confirm('提示', '确认需要刷新数据？', function (btn) {
            if (btn == 'yes') {
                Ext.util.Common.ajax({
                    method: 'POST',
                    jsonData: null,
                    url: App.globalConfig.path + '/legend-task-allocation/refresh-data',
                    success: function () {
                        me.readRecord();
                    }
                });
            }
        })
    },

    getSelectionCodes: function () {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function (record) {
            var temp = {};

            temp.legendGroupCode = record.get('legendGroupCode');
            temp.seriesCode = record.get('seriesCode');
            codes.push(temp);
        });

        return codes;
    }
});