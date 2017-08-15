Ext.define('App.controller.partUsage.RepeatUsageTask', {
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
                default:
                    break;
            }
        });

        grid.on('cellclick', function (view, cell, cellIndex, record, row, rowIndex, e) {

            if (e.getTarget('[data-action=complete]')) {
                me.openSingleCompleteDialog(record);
            }

            if (e.getTarget('[data-action=act]')) {
                me.openAct(record);
            }
        });
    },

    openBatchCompleteDialog: function (record) {
        var me = this,
            params = me.getSelectionCodes();

        Ext.Msg.confirm('提示', '您确认要完成选择的任务?', function(btn) {

            if (btn === 'yes') {
                Ext.util.Common.ajax({
                    method: 'PUT',
                    jsonData: params,
                    url: App.globalConfig.path + '/repeat-usage-task/save-finish',
                    success: function() {
                        me.readRecord();
                    }
                });
            }
        });
    },

    openSingleCompleteDialog: function (record) {
        var me = this;

        Ext.Msg.confirm('提示', '您确认要完成该任务？', function(btn) {
            var params = [{
                partCode: record.get('partCode'),
                parentPartCode: record.get('parentPartCode'),
                supcfnaCode: record.get('supcfnaCode'),
                parentPartSupcfnaCode: record.get('parentPartSupcfnaCode')
            }];

            if (btn === 'yes') {
                Ext.util.Common.ajax({
                    method: 'PUT',
                    jsonData: params,
                    url: App.globalConfig.path + '/repeat-usage-task/save-finish',
                    success: function() {
                        me.readRecord();
                    }
                });
            }
        });
    },

    openAct: function (record) {
        var me = this,
            mainController = me.getMainController();

        mainController.loadPage('415', {
            partCode: record.get('parentPartCode'),
            upcfnaCode: record.get('parentPartSupcfnaCode')
        });
    },

    getSelectionCodes: function() {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function(record) {
            codes.push({
                partCode: record.get('partCode'),
                parentPartCode: record.get('parentPartCode'),
                supcfnaCode: record.get('supcfnaCode'),
                parentPartSupcfnaCode: record.get('parentPartSupcfnaCode')
            });
        });

        return codes;
    }
});