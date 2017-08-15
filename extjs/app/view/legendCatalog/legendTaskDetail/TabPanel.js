Ext.define('App.view.legendCatalog.legendTaskDetail.TabPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.legendtaskdetailtabpanel',
    region: 'center',
    reference: 'legendTaskDetailCardPanel',
    cls: 'app-main-container',
    layout: {
        type: 'card',
        anchor: '100%'
    },
    itemId: 'legend-task-detail-tab-panel',
    constructor: function() {
        var me = this;

        this.curLegendInfoPage = 0;
        this.curSimilarInfoPage = 0;
        this.pageSize = 20;

        this.callParent(arguments);
    },
    initEvents: function() {
        var me = this;

    },
    removeAllList: function() {
        var me = this,
            legendInfoListWrapper = me.down('[itemId=legend-info-list]'),
            similarInfoListWrapper = me.down('[itemId=similar-legend-list]'),
            tabs = me.down('tabpanel');

        tabs.setActiveTab(0);
        legendInfoListWrapper.removeAll();
        similarInfoListWrapper.removeAll();

        me.curLegendInfoPage = 0;
        me.curSimilarInfoPage = 0;
    },
    loadLegendInfoList: function(params, isReplaceMode) {
        var me = this;

        if (isReplaceMode) {
            me.removeAllList();
        }

        params = {
            paging: {
                page: ++me.curLegendInfoPage,
                size: me.pageSize
            },
            seriesCode: params.seriesCode,
            legendGroupCode: params.legendGroupCode
        };

        me.setLoading(true);

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend/task-detail/legend-info/page',
            callback: function() {
                me.setLoading(false);
            },
            success: function(res) {
                me.renderLegendInfoList(res.list || [], isReplaceMode, params);
            }
        });
    },
    renderLegendInfoList: function(res, isReplaceMode, params) {
        var me = this,
            legendInfoListWrapper = me.down('[itemId=legend-info-list]'),
            items = [];

        for (var i = 0; i < res.length; i++) {

            items.push({
                items: [{
                    width: '100%',
                    height: 342,
                    border: true,
                    items: [{
                        xtype: 'imagefield',
                        url: App.globalConfig.legendImgRestPrefix + res[i].photoThumbnailFilename,
                        nopicPath: App.globalConfig.path + '/styles/images',
                        noImgFile: 'no_img.png',
                        viewBig: true,
                        value: ''
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '车系',
                        name: 'seriesName',
                        value: res[i].seriesName,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '图例分组',
                        name: 'legendGroupName',
                        value: res[i].legendGroupName,
                        readOnly: true
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '图例编码',
                        name: 'legendCode',
                        value: res[i].legendCode,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '图例名称',
                        name: 'legendName',
                        value: res[i].legendName,
                        readOnly: true
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '图例备注',
                        name: 'legendNote',
                        value: res[i].legendNote,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '配件总数',
                        name: 'thisLegendPartNums',
                        value: res[i].partNumsOnLegend,
                        readOnly: true
                    }]
                }, {
                    items: [{
                        xtype: 'button',
                        cls: 'view-legend-detail',
                        text: '图例详细',
                        value: res[i].legendCode,
                        listeners: {
                            click: function() {
                                this.up('[itemId=legend-task-detail-tab-panel]').fireEvent('viewlegenddetail', {
                                    code: this.value
                                });
                            }
                        }
                    }]
                }]
            });
        }

        if (isReplaceMode && items.length >= me.pageSize) {
            items.push({
                border: false,
                itemId: 'more-legend-info',
                items: [{
                    xtype: 'button',
                    cls: 'more-legend-info',
                    text: '查看更多',
                    listeners: {
                        click: function() {

                            this.up('[itemId=legend-task-detail-tab-panel]').loadLegendInfoList(params);
                        }
                    }
                }]
            });
        }

        if (isReplaceMode) {
            legendInfoListWrapper.add(items);
        } else {
            if (items.length >= me.pageSize) {
                legendInfoListWrapper.insert(legendInfoListWrapper.items.length - 1, items);
            } else {

                legendInfoListWrapper.remove(me.down('[itemId=more-legend-info]'), true);
                legendInfoListWrapper.add(items);
            }
        }
    },

    loadSimilarInfoList: function(params, isReplaceMode) {
        var me = this,
            tabs = me.down('tabpanel'),
            similarInfoListWrapper = me.down('[itemId=similar-legend-list]');

        if (isReplaceMode) {
            me.curSimilarInfoPage = 0;
            similarInfoListWrapper.removeAll();
        }

        params = {
            paging: {
                page: ++me.curSimilarInfoPage,
                size: me.pageSize
            },
            partCodes: params.partCodes,
            seriesCode: params.seriesCode
        };

        tabs.setActiveTab(1);
        me.setLoading(true);
        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend/task-detail/similar-legend/page',
            callback: function() {
                me.setLoading(false);
            },
            success: function(res) {
                me.renderSimilarInfoList(res.list || [], isReplaceMode, params);
            }
        });
    },

    renderSimilarInfoList: function(res, isReplaceMode, params) {
        var me = this,
            similarInfoListWrapper = me.down('[itemId=similar-legend-list]'),
            items = [];

        for (var i = 0; i < res.length; i++) {
            items.push({
                items: [{
                    width: '100%',
                    height: 342,
                    border: true,
                    items: [{
                        xtype: 'imagefield',
                        url: App.globalConfig.legendImgRestPrefix + res[i].legendFilename,
                        nopicPath: App.globalConfig.path + '/styles/images',
                        noImgFile: 'no_img.png',
                        viewBig: true,
                        value: ''
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '车系',
                        name: 'seriesName',
                        value: res[i].seriesName,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '图例分组',
                        name: 'legendGroupName',
                        value: res[i].legendGroupName,
                        readOnly: true
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '图例编码',
                        name: 'legendCode',
                        value: res[i].legendCode,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '图例名称',
                        name: 'legendName',
                        value: res[i].legendName,
                        readOnly: true
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '图例备注',
                        name: 'legendNote',
                        value: res[i].legendNote,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '配件总数',
                        name: 'thisLegendPartNums',
                        value: res[i].thisLegendPartNums,
                        readOnly: true
                    }]
                }, {
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: '匹配数',
                        name: 'matchNums',
                        value: res[i].matchNums,
                        readOnly: true
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '匹配率',
                        name: 'matchRate',
                        value: res[i].matchRate ? res[i].matchRate + '%' : '0%',
                        readOnly: true
                    }]
                }]
            });
        }

        if (isReplaceMode && items.length >= me.pageSize) {
            items.push({
                border: false,
                itemId: 'more-similar-info',
                items: [{
                    xtype: 'button',
                    cls: 'more-similar-info',
                    text: '查看更多',
                    listeners: {
                        click: function() {

                            this.up('[itemId=legend-task-detail-tab-panel]').loadSimilarInfoList(params);
                        }
                    }
                }]
            });
        }

        if (isReplaceMode) {
            similarInfoListWrapper.add(items);
        } else {
            if (items.length >= me.pageSize) {
                similarInfoListWrapper.insert(similarInfoListWrapper.items.length - 1, items);
            } else {
                similarInfoListWrapper.remove(me.down('[itemId=more-similar-info]'), true);
                similarInfoListWrapper.add(items);
            }
        }
    },

    items: [{
        xtype: 'tabpanel',
        id: "legend-task-detail-tabs",
        ui: 'tabpanel-border',
        cls: 'tabpanel-white-bg',
        margin: '0 5 0 5',
        defaults: {
            layout: 'vbox',
            width: '100%',
            height: '100%',
            autoScroll: true,
            bodyStyle: 'background: #fff !important;',
            defaults: {
                margin: '5 5 5 5',
                border: true,
                width: '100%',
                layout: 'vbox',
                bodyStyle: 'background: #fff !important;padding: 10px;',
                defaults: {
                    width: '100%',
                    margin: '0 0 5 0',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 5 0 0',
                        labelWidth: 55,
                        flex: 1
                    }
                }
            }
        },
        items: [{
            title: '图例信息',
            itemId: 'legend-info-list',
            items: []
        }, {
            title: '相似图例',
            itemId: 'similar-legend-list',
            items: []
        }]
    }]
});