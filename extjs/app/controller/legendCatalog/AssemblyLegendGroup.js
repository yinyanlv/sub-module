Ext.define('App.controller.legendCatalog.AssemblyLegendGroup', {
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
                case 'get-assembly':
                    me.getAssembly();
                    break;
                case 'batch-ensure':
                    me.batchEnsure();
                    break;
                case 'batch-update-legend-group':
                    me.batchUpdateLegendGroup();
                    break;
                case 'batch-import-legend-group':
                    me.openImportDialog();
                    break;
                case 'batch-update-spl':
                    me.batchUpdateSpl();
                    break;
                default:
                    break;
            }
        });
    },

    getAssembly: function () {
        var me = this;

        Ext.Msg.confirm('提示', '您确定要获取一级总成件？', function (btn) {

            if (btn === 'yes') {

                Ext.util.Common.ajax({
                    method: 'GET',
                    disableCaching: true,
                    url: App.globalConfig.path + '/legend/rootpart-group-manage/refresh',
                    success: function () {
                        me.readRecord();
                    }
                });
            }
        });
    },

    batchEnsure: function () {
        var me = this,
            params = me.getSelectionCodes();

        Ext.Msg.confirm('提示', '您确定要确认系统分配的图例分组么？', function (btn) {

            if (btn === 'yes') {

                Ext.util.Common.ajax({
                    method: 'PUT',
                    jsonData: params,
                    url: App.globalConfig.path + '/legend/rootpart-group-manage/batch-adopt',
                    success: function () {
                        me.readRecord();
                    }
                });
            }
        });
    },

    batchUpdateLegendGroup: function () {
        var me = this,
            params = me.getSelectionCodes(),
            className = 'App.view.legendCatalog.assemblyLegendGroup.BatchUpdateLegendGroup',
            dialog = Ext.create(className, {
                params: params,
                autoShow: true
            });

        dialog.on('updatefinished', function() {
            me.readRecord();
        });
    },

    batchUpdateSpl: function () {
        var me = this,
            params = me.getSelectionCodes(),
            className = 'App.view.legendCatalog.assemblyLegendGroup.BatchUpdateSPL',
            dialog = Ext.create(className, {
                params: params,
                autoShow: true
            });

        dialog.on('updatefinished', function() {
            me.readRecord();
        });
    },

    openImportDialog: function () {
        var me = this,
            dialog = Ext.create('App.view.common.window.UploadImportFile', {
                title: '批量导入一级总成件-图例分组',
                autoShow: true,
                uploadUrl: App.globalConfig.path + '/legend/rootpart-group-manage/import-excel',
                tplUrl: App.globalConfig.resPrefix + '/template/一级总成件-图例分组-导入模板.xlsx'
            });

        dialog.on('uploadsuccess', function (result) {
            Ext.Msg.alert('提示', '导入成功');

            me.readRecord();
        });
    },

    getSelectionCodes: function () {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function (record) {
            codes.push({
                rootPartCode: record.get('rootPartCode'),
                supcfnaCode: record.get('supcfnaCode')
            });
        });

        return codes;
    }
});