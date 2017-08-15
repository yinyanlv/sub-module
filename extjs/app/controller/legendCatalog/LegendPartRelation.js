Ext.define('App.controller.legendCatalog.LegendPartRelation', {
    extend: 'Ext.ux.controller.CRUD',
    viewportReady: function() {
        var me = this,
            params = me.viewport.params;

        this.callParent(arguments);

        me.bindEvents();

        if (params) {
            me.autoLoad(params)
        }
    },

    autoLoad: function(params) {
        if (!(params.brandCode && params.seriesCode && params.legendCode)) return;

        var me = this,
            query = me.getQuery(),
            form = query.down('form').getForm(),
            cbBrand = query.down('[name=brandCode]'),
            cbSeries = query.down('[name=seriesCode]');

        cbBrand.setValue(params.brandCode);
        cbSeries.setValue(params.seriesCode);

        cbBrand.getStore().load(function() {
            cbSeries.getStore().load(function() {
                query.doQuery();
            });
        });
    },

    bindEvents: function() {
        var me = this,
            query = me.getQuery(),
            tabs = Ext.getCmp('tabs'),
            legend = me.viewport.down('legendpartrelationlegend'),
            grid = me.viewport.down('legendpartrelationgrid');

        query.on('queryRecord', function(params) {
            me.loadLegendInfo(params);
        });

        legend.on('activecallout', function(callout) {
            grid.highlightCallout(callout);
        });

        grid.on({
            'toolbarclick': function(that) {
                var action = that.action;

                switch (action) {
                    case 'edit':
                        me.openEditDialog();
                        break;
                    case 'delete':
                        Ext.Msg.confirm('提示', '确认要删除选择的用法吗?', function(btn) {
                            if (btn === 'yes') {
                                me.doDelete();
                            }
                        });
                        break;
                    case 'ensure-recommend':
                        Ext.Msg.confirm('提示', '您确认操作确认系统推荐关系么？', function(btn) {
                            if (btn === 'yes') {
                                me.ensureRecommend();
                            }
                        });
                        break;
                    case 'add-usage':
                        me.addUsage();
                        break;
                    default:
                        break;
                }
            },
            'selectionchange': function(that, selected, eOpts) {
                var callout;

                if (selected.length > 0) {
                    callout = selected[0].get('callout')
                    legend.activeCallout([callout]);
                }
            },
            'rowdblclick': function(view, record, tr, rowIndex, e, eOpts) {
                me.openEditDialog();
            }
        });

        tabs.on('tabchange', function(tabPanel, newCard, oldCard, eOpts) {
            var params = newCard.params;

            if (newCard.id == 'tab_' + newCard.pid && params) {
                window.setTimeout(function() {
                    me.autoLoad(params);
                }, 200);
            }
        });
    },

    doDelete: function() {
        var me = this,
            grid = me.getGrid(),
            params = me.getDelParams();

        Ext.util.Common.ajax({
            url: App.globalConfig.path + '/legend-part-manage/delete',
            method: 'DELETE',
            jsonData: params,
            beforerequest: function() {
                grid.setLoading('提示', '删除中...');
            },
            callback: function() {
                grid.setLoading(false);
            },
            success: function() {
                Ext.Msg.alert('提示', '删除成功');
                me.readRecord();
            }
        });
    },

    getDelParams: function() {
        var me = this,
            params = [],
            records = me.getGridSelection();

        Ext.each(records, function(item) {
            params.push({
                legendCode: me.legendInfo.code,
                callout: item.get('callout'),
                usageCode: item.get('usageCode'),
                recommendCallout: item.get('recommendCallout')
            });
        })

        return params;
    },

    loadLegendInfo: function(params) {
        var me = this;

        params = me.convertParams(params);

        Ext.util.Common.ajax({
            method: 'GET',
            params: {
                legendCode: params.legendCode
            },
            url: App.globalConfig.path + '/legend-file/detail',
            success: function(root) {
                var result = root.result || {};

                me.legendInfo = result;
                me.fillLegendInfo(result);
                me.setLegendSrc(result);
            }
        });
    },

    fillLegendInfo: function(result) {
        var me = this,
            legend = me.viewport.down('legendpartrelationlegend'),
            legendInfo = me.viewport.down('[itemId=legendInfo]'),
            form = legendInfo.getForm();

        form.setValues(result);
    },

    setLegendSrc: function(result) {
        var me = this,
            legend = me.viewport.down('legendpartrelationlegend'),
            originalSrc = App.globalConfig.legendImgRestPrefix + '/' + result.photoUltimatelyFilename,
            legendSrc = App.globalConfig.path + '/file/mapping?url=' + originalSrc;

        legend.loadSVG(legendSrc);
    },

    convertParams: function(items) {
        var me = this,
            params = {};

        Ext.each(items, function(item) {
            params[item.name] = item.value;
        });

        return params;
    },

    ensureRecommend: function() {
        var me = this,
            grid = me.getGrid(),
            params = me.getEnsureRecommendParams();

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend-part-manage/batch-adopt-with-check',
            beforerequest: function() {
                grid.setLoading('提示', '执行中...')
            },
            callback: function() {
                grid.setLoading(false);
            },
            success: function(root) {
                if (root.success) {
                    Ext.Msg.alert('提示', '操作成功!');
                    me.readRecord();
                } else {
                    Ext.Msg.confirm('提示', root.message, function(btn) {
                        if (btn === 'yes') {
                            me.redoEnsureRecommend();
                        }
                    })
                }
            }
        });
    },

    redoEnsureRecommend: function() {
        var me = this,
            grid = me.getGrid(),
            params = me.getEnsureRecommendParams();

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend-part-manage/batch-adopt',
            beforerequest: function() {
                grid.setLoading('提示', '执行中...')
            },
            callback: function() {
                grid.setLoading(false);
            },
            success: function(root) {
                Ext.Msg.alert('提示', '操作成功!');
                me.readRecord();
            }
        });
    },

    addUsage: function() {
        var me = this,
            queryForm = me.viewport.down('legendpartrelationquery'),
            params = queryForm.down('form').getValues(),
            seriesCode = queryForm.down('form').getForm().findField('seriesCode'),
            dialog;

        if (!seriesCode.isValid()) {

            Ext.Msg.alert('提示', '查询区域的必填项车系不能为空');

            return;
        }

        dialog = Ext.create('Ext.window.Window', {
            width: 795,
            height: 520,
            modal: true,
            resizable: false,
            autoShow: true,
            title: '选择用法',
            layout: 'fit',
            items: [{
                xtype: 'legendpartrelationaddusage',
                params: {
                    seriesCode: params.seriesCode,
                    legendCode: me.legendInfo.code
                },
                listeners: {
                    finished: function() {
                        dialog.close();
                        me.readRecord();
                    }
                }
            }]
        });
    },

    getEnsureRecommendParams: function() {
        var me = this,
            codes = [],
            selections = me.getGridSelection();

        Ext.each(selections, function(item) {
            codes.push({
                legendCode: me.legendInfo.code,
                partCode: item.get('partCode'),
                usageCode: item.get('usageCode'),
                rpo: item.get('rpo'),
                supcfnaCode: item.get('supcfnaCode'),
                callout: item.get('callout'),
                recommendCallout: item.get('recommendCallout')
            });
        });

        return codes;
    },

    openEditDialog: function() {
        var me = this,
            selectionRecord = me.getSelectionRecord();

        Ext.create('App.view.legendCatalog.legendPartRelation.EditUsage', {
            autoShow: true,
            record: selectionRecord,
            legendCode: me.legendInfo.code,
            listeners: {
                savefinished: function() {
                    me.readRecord();
                }
            }
        });
    },

    getSelectionRecord: function() {
        var me = this,
            grid = me.viewport.down('legendpartrelationgrid'),
            records = grid.getSelectionModel().getSelection();

        if (records.length) {
            return records[0];
        } else {
            return {};
        }
    }
});