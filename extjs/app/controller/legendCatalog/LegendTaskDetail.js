Ext.define('App.controller.legendCatalog.LegendTaskDetail', {
    extend: 'Ext.ux.controller.CRUD',
    controllerReady: function () {
        var me = this;

        me.bindEvents();
    },

    bindEvents: function () {
        var me = this,
            grid = me.getGrid(),
            query = me.getQuery(),
            tabPanel = this.viewport.down('[itemId=legend-task-detail-tab-panel]'),
            mainController = me.getMainController();

        grid.on('toolbarclick', function (that) {
            var action = that.action;

            switch (action) {
                case 'auto-assign':
                    me.autoAssign();
                    break;
                case 'attach-legend':
                    me.attachLegend();
                    break;
                case 'similar-legend':
                    me.showSimilarLegend();
                    break;
                case 'batch-ensure':
                    me.batchEnsure();
                    break;
                case 'view-assign-history':
                    me.viewAssignHistory();
                    break;
                default:
                    break;
            }

        });

        query.on('loadlegendinfo', function (params) {

            tabPanel.loadLegendInfoList(params, true);
        });

        tabPanel.on('viewlegenddetail', function (params) {
            mainController.loadPage('1004', {
                code: params.code
            });
        });
    },

    autoAssign: function () {
        var me = this,
            params = me.getSelectionCodes(),
            className = 'App.view.legendCatalog.legendTaskDetail.AutoAssign',
            dialog = Ext.create(className, {
                params: params,
                autoShow: true
            });

        dialog.on('autoassignfinished', function () {
            me.readRecord();
        });
    },

    attachLegend: function () {
        var me = this,
            dialog,
            queryForm = me.viewport.down('legendtaskdetailquery'),
            params = queryForm.down('form').getValues(),
            usageCodes = me.getSelectionCodes('usageCode');

        if (!queryForm.isValid()) {

            Ext.Msg.alert('提示', '请填写查询区域相关必填项');

            return;
        }

        dialog = Ext.create('Ext.window.Window', {
            width: 795,
            height: 520,
            modal: true,
            resizable: false,
            autoShow: true,
            title: '选择需要挂靠的图例',
            layout: 'fit',
            items: [{
                xtype: 'legendtaskdetailattachlegend',
                params: {
                    brandCode: params.brandCode,
                    seriesCode: params.seriesCode,
                    groupCode: params.legendGroupCode,
                    usageCodes: usageCodes,
                    controller: me
                }
            }]
        });

        dialog.down('legendtaskdetailattachlegend').on('selectedrecords', function () {
            dialog.close();
            me.readRecord();
        });
    },

    showSimilarLegend: function () {
        var me = this,
            queryForm = me.viewport.down('legendtaskdetailquery'),
            params = queryForm.down('form').getValues(),
            partCodes = me.getSelectionCodes('partCode'),
            tabPanel = this.viewport.down('[itemId=legend-task-detail-tab-panel]');

        tabPanel.loadSimilarInfoList({
            seriesCode: params.seriesCode,
            partCodes: partCodes
        }, true);
    },

    batchEnsure: function () {
        var me = this,
            params = me.getSelectionCodes('usageCode');

        Ext.Msg.confirm('提示', '您确定要确认系统推荐配图么？', function (btn) {

            if (btn === 'yes') {

                Ext.util.Common.ajax({
                    method: 'POST',
                    jsonData: params,
                    url: App.globalConfig.path + '/legend/task-detail/apply-recommend-legend',
                    success: function () {
                        me.readRecord();
                    }
                });
            }
        });
    },

    viewAssignHistory: function () {
        var me = this,
            params = me.getSelectionCodes(),
            dialog;

        dialog = Ext.create('Ext.window.Window', {
            width: 795,
            height: 520,
            modal: true,
            resizable: false,
            autoShow: true,
            title: '自动挂靠记录',
            layout: 'fit',
            items: [{
                xtype: 'legendtaskdetailassignhistory',
                params: params
            }]
        });

        dialog.down('legendtaskdetailassignhistory').readRecord();
    },

    openLegendPartRelation: function (params) {
        var me = this,
            mainController = me.getMainController();

        mainController.loadPage('606', params);
    },

    getSelectionCodes: function (key) {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function (record) {
            codes.push(record.get(key));
        });

        return codes;
    }
});