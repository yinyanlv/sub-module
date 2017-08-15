Ext.define('App.controller.partEngineering.AppendPartStructTask', {
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
                case 'batch-complete':
                    me.openBatchCompleteDialog();
                    break;
                case 'create-struct':
                    me.openCreateStruct();
                    break;
                case 'maintenance-relationship':
                    me.openMaintenanceRelationship();
                    break;
                case 'attach-series':
                    me.openAttachSeries();
                default:
                    break;
            }
        });

        grid.on('cellclick', function (view, cell, cellIndex, record, row, rowIndex, e) {

            if (e.getTarget('[data-action=complete]')) {
                me.openSingleCompleteDialog(record);
            }
        });
    },

    openBatchCompleteDialog: function () {
        var me = this,
            params = me.getSelectionCodes();

        Ext.Msg.confirm('提示', '您确认要完成选择的任务?', function (btn) {

            if (btn === 'yes') {
                Ext.util.Common.ajax({
                    method: 'POST',
                    jsonData: params,
                    url: App.globalConfig.path + '/new-part-structure/save-finish',
                    success: function () {
                        me.readRecord();
                    }
                });
            }
        });
    },

    openSingleCompleteDialog: function (record) {
        var me = this;

        Ext.Msg.confirm('提示', '您确认要完成该任务？', function (btn) {
            var params = [{
                partCode: record.get('partCode')
            }];

            if (btn === 'yes') {
                Ext.util.Common.ajax({
                    method: 'POST',
                    jsonData: params,
                    url: App.globalConfig.path + '/new-part-structure/save-finish',
                    success: function () {
                        me.readRecord();
                    }
                });
            }
        });
    },

    openCreateStruct: function () {
        var me = this,
            mainController = me.getMainController();

        mainController.loadPage('415', {});
    },

    openMaintenanceRelationship: function () {
        var me = this,
            mainController = me.getMainController();

        mainController.loadPage('406', {
        });
    },

    openAttachSeries: function () {
        var me = this,
            record = me.getGridSelection()[0],
            className = 'App.view.partEngineering.appendPartStructTask.AttachSeries',
            dialog = Ext.create(className, {
                autoShow: true
            });

        dialog.setRecord(record);

        dialog.on('updatefinished', function() {
            me.readRecord();
        });
    },

    getSelectionCodes: function () {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function (record) {
            codes.push({
                partCode: record.get('partCode')
            });
        });

        return codes;
    }
});