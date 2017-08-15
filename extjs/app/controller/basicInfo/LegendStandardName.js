Ext.define('App.controller.basicInfo.LegendStandardName', {
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

            if (action === 'import') {
                me.openImportDialog();
            } else if (action === 'view-fna') {

                me.openViewFnaDialog();
            } else if (action === 'export-fna') {

                me.exportFna();
            }
        });
    },

    openImportDialog: function () {
        var me = this,
            dialog = Ext.create('App.view.common.window.UploadImportFile', {
                title: '导入图例标准名称',
                autoShow: true,
                uploadUrl: App.globalConfig.path + '/legend-standard-name/import-excel',
                tplUrl: App.globalConfig.resPrefix + '/template/图例标准名称-导入模板.xlsx'
            });

        dialog.on('uploadsuccess', function (result) {
            Ext.Msg.alert('提示', '导入成功');

            me.readRecord();
        });
    },

    openViewFnaDialog: function () {
        var me = this,
            params = me.getSelectionCodes(),
            dialog = Ext.create('App.view.basicInfo.legendStandardName.FnaGrid', {
                legendStandardCode: params[0] && params[0].code
            });

        dialog.show();
    },

    exportFna: function () {
        var me = this,
            params = me.getSelectionCodes(),
            codes = [];

        for (var i = 0; i < params.length; i++) {
            codes.push(params[i].code);
        }

        codes = codes.join(',');

        window.open(App.globalConfig.path + '/legend-standard-name/export-supcfna?codes=' + codes);
    },

    getSelectionCodes: function () {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function (record) {
            codes.push({
                code: record.get('code')
            });
        });

        return codes;
    }
});