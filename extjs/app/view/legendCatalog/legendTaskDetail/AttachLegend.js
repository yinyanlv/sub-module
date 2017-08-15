Ext.define('App.view.legendCatalog.legendTaskDetail.AttachLegend', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.legendtaskdetailattachlegend',
    requires: ['Ext.ux.component.paging.Paging'],
    multiSelect: true,
    multiSelectCheckbox: true,
    autoDestroy: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    extraFilters: [],
    notResetFields: ['seriesCode', 'groupCode'],
    viewConfig: {
        enableTextSelection: true,
        getRowClass: function () {
            return this.enableTextSelection ? 'x-selectable' : '';
        }
    },
    constructor: function (config) {
        var me = this;

        me.createStore(config);
        me.callParent(arguments);
    },
    initComponent: function () {
        var me = this;

        me.bbar.items[0].store = me.getStore();
        me.callParent(arguments);
    },
    initEvents: function () {
        var me = this,
            store = me.getStore(),
            form = me.down('form'),
            btnQuery = me.down('[action=query]'),
            btnReset = me.down('[action=reset]'),
            btnEnsure = me.down('[action=ensure]');

        btnQuery.on('click', function () {
            me.doSearch();
        });
        btnReset.on('click', function () {
            me.doReset();
        });
        btnEnsure.on('click', function () {
            me.doEnsure();
        });

        store.on('beforeload', function () {
            me.addStoreFilters();
        });

        if (me.params) {
            form.getForm().setValues(me.params);
        }

        me.readRecord();
    },
    doReset: function () {
        var me = this,
            fields = me.down('form').query("field");

        Ext.each(fields, function(item) {
            var curName = item.name,
                isNeedReset = true;
            for (var i = 0; i < me.notResetFields.length; i++) {

                if (curName === me.notResetFields[i]) {
                    isNeedReset = false;
                    break;
                }
            }
            if (isNeedReset) {
                item.setValue("");
            }
        });
    },
    doSearch: function () {
        var me = this;

        me.readRecord();
    },
    doEnsure: function () {
        var me = this,
            selections = me.getSelectionModel().getSelection();

        if (selections.length < 1) {
            Ext.Msg.alert('提示', '请选择需要挂靠的图例');

            return;
        }

        var params = {
            legendCode: selections[0].get('code'),
            usageCodes: me.params.usageCodes
        };

        me.setLoading(true);

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend/task-detail/attach-to-legend',
            callback: function () {
                me.setLoading(false);
            },
            success: function () {
                me.fireEvent('selectedrecords');

                me.params.controller.openLegendPartRelation({
                    brandCode: me.params.brandCode,
                    seriesCode: me.params.seriesCode,
                    legendCode: params.legendCode
                });
            }
        });
    },
    readRecord: function () {
        var me = this,
            store = me.getStore();

        store.loadPage(1);
    },
    addStoreFilters: function (store) {
        var me = this,
            store = me.getStore(),
            params = me.getParams();

        store.proxy.extraFilters = params;
    },
    getParams: function () {
        var me = this,
            params = [],
            form = me.down('form').getForm(),
            fields = form.getFields();

        Ext.each(fields.items, function (item) {
            var val = item.getValue();

            if (!Ext.isEmpty(val)) {
                params.push({
                    name: item.name,
                    value: val
                });
            }
        });

        return params;
    },
    createStore: function (config) {
        var me = this;

        me.store = Ext.create('Ext.ux.store.Base', {
            fields: [
                'code',
                'createdBy',
                'createdDate',
                'groupCode',
                'groupName',
                'legendStandardCode',
                'legendStandardNameEn',
                'legendStandardNameZh',
                'modifiedBy',
                'modifiedDate',
                'nameEn',
                'nameZh',
                'note',
                'photoOriginalFilename',
                'photoThumbnailFilename',
                'photoUltimatelyFilename'
            ],
            proxyAPI: {
                read: App.globalConfig.path + '/legend/task-detail/attach-legend/page'
            },
            listeners: {
                aftererror: function (operation, response) {
                    Ext.util.Common.errorHandler(response);
                }
            },
            sorters: []
        });
    },
    tbar: [{
        xtype: 'form',
        layout: 'column',
        border: false,
        width: '100%',
        defaults: {
            xtype: 'textfield',
            margin: '5 15 0 0',
            labelWidth: 100,
            enableKeyEvents: true
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '车系',
            readOnly: true,
            name: 'seriesCode'
        }, {
            xtype: 'textfield',
            fieldLabel: '图例分组',
            readOnly: true,
            name: 'groupCode'
        }, {
            xtype: 'textfield',
            fieldLabel: '图例编码',
            name: 'code'
        }, {
            xtype: 'textfield',
            fieldLabel: '图例名称',
            name: 'name'
        }, {
            xtype: 'textfield',
            fieldLabel: '图例备注',
            name: 'note'
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            border: true,
            layout: {
                align: 'middle',
                pack: 'center',
                type: 'hbox'
            },
            height: 'auto',
            style: 'padding-bottom: 5px;padding-top: 5px;',
            defaults: {
                width: 80
            },
            items: [{
                xtype: 'button',
                action: "query",
                text: "查询"
            }, {
                xtype: 'button',
                action: "reset",
                text: "重置"
            }]
        }]
    }],
    bbar: {
        layout: 'form',
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        defaults: {
            border: false
        },
        items: [
            {
                xtype: 'paging',
                itemId: 'paging',
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                displayInfo: true
            },
            {
                xtype: 'toolbar',
                border: false,
                margin: '10 0 0 0',
                layout: {
                    align: 'middle',
                    pack: 'center',
                    type: 'hbox'
                },
                height: 'auto',
                defaults: {
                    width: 80,
                    border: false
                },
                items: [{
                    xtype: 'button',
                    action: "ensure",
                    text: "确定"
                }]
            }
        ]
    },
    columns: [{
        text: "序号",
        xtype: 'rownumberer',
        align: 'center',
        width: 60
    }, {
        text: '图例编码',
        dataIndex: 'code',
        width: 140
    }, {
        text: '图例中文名称',
        dataIndex: 'nameZh',
        width: 160
    }, {
        text: '图例英文名称',
        dataIndex: 'nameEn',
        width: 160
    }, {
        text: '图例标准名称编码',
        dataIndex: 'legendStandardCode',
        width: 140
    }, {
        text: '图例标准中文名称',
        dataIndex: 'legendStandardNameZh',
        width: 160
    }, {
        text: '图例标准英文名称',
        dataIndex: 'legendStandardNameEn',
        width: 160
    }, {
        text: '图文件名',
        dataIndex: 'photoOriginalFilename',
        width: 140
    }, {
        text: '图例备注',
        dataIndex: 'note',
        width: 140
    }, {
        text: '图例分组',
        dataIndex: 'groupName',
        width: 140
    }, {
        text: '创建人',
        dataIndex: 'createdBy',
        width: 120
    }, {
        text: '创建时间',
        dataIndex: 'createdDate',
        width: 140,
        renderer: function (data, metadata, record) {
            var createDate = record.get('createdDate');

            return Ext.util.Format.localDate(createDate);
        }
    }, {
        text: '修改人',
        dataIndex: 'modifiedBy',
        width: 120
    }, {
        text: '修改时间',
        dataIndex: 'modifiedDate',
        width: 140,
        renderer: function (data, metadata, record) {
            var modifiedDate = record.get('modifiedDate');

            return Ext.util.Format.localDate(modifiedDate);
        }
    }]
});