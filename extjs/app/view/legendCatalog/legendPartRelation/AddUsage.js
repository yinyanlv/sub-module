Ext.define('App.view.legendCatalog.legendPartRelation.AddUsage', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.legendpartrelationaddusage',
    requires: ['Ext.ux.component.paging.Paging'],
    multiSelect: true,
    multiSelectCheckbox: true,
    autoDestroy: true,
    selModel: {
        selType: 'checkboxmodel'
    },
    extraFilters: [],
    notResetFields: ['seriesCode'],
    viewConfig: {
        enableTextSelection: true,
        getRowClass: function () {
            return this.enableTextSelection ? 'x-selectable' : '';
        }
    },
    constructor: function(config) {
        var me = this;

        me.createStore(config);
        me.callParent(arguments);
    },

    initComponent: function() {
        var me = this;

        me.bbar.items[0].store = me.getStore();
        me.callParent(arguments);
    },

    initEvents: function() {
        var me = this,
            store = me.getStore(),
            form = me.down('form'),
            fields = me.query("field"),
            btnQuery = me.down('[action=query]'),
            btnReset = me.down('[action=reset]'),
            btnEnsure = me.down('[action=ensure]');

        btnQuery.on('click', function() {
            me.doSearch();
        });
        btnReset.on('click', function() {
            me.doReset();
        });
        btnEnsure.on('click', function() {
            me.doEnsure();
        });
        store.on('beforeload', function() {
            me.addStoreFilters();
        });
        Ext.each(fields, function(item) {
            item.on("keyup", function(sender, e) {
                if (e.getKey() === e.ENTER) me.readRecord();
            });
        });
        if (me.params) {
            form.getForm().setValues(me.params);
        }

        me.readRecord();
    },

    doReset: function() {
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

    doSearch: function() {
        var me = this;

        me.readRecord();
    },

    doEnsure: function() {
        var me = this,
            params = me.getEnsureParams();

        if (params.length == 0) {
            Ext.Msg.alert('提示', '请选择用法');
            return;
        }

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend-part-manage/add-usage',
            beforerequest: function() {
                me.setLoading(true);
            },
            callback: function() {
                me.setLoading(false);
            },
            success: function(root) {
                Ext.Msg.alert('提示', '加入成功');
                me.fireEvent('finished');
            }
        });
    },

    getEnsureParams: function() {
        var me = this,
            params = [],
            selections = me.getSelectionModel().getSelection();

        Ext.each(selections, function(item) {
            params.push({
                legendCode: me.params.legendCode,
                partCode: item.get('partCode'),
                rpo: item.get('rpo'),
                supcfnaCode: item.get('supcfnaCode'),
                usageCode: item.get('code')
            });
        });

        return params;
    },

    readRecord: function() {
        var me = this,
            store = me.getStore();

        store.loadPage(1);
    },

    addStoreFilters: function(store) {
        var me = this,
            store = me.getStore(),
            params = me.getParams();

        store.proxy.extraFilters = params;
    },

    getParams: function() {
        var me = this,
            params = [],
            form = me.down('form').getForm(),
            fields = form.getFields();

        Ext.each(fields.items, function(item) {
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

    createStore: function(config) {
        var me = this;

        me.store = Ext.create('Ext.ux.store.Base', {
            fields: [
                'seriesCode',
                'partCode',
                'partNameZh',
                'partNameEn',
                'supcfnaCode',
                'supcfnaNameZh',
                'supcfnaNameEn',
                'qty',
                'rpo',
                'startDate',
                'endDate',
                'code',
                'usageNote'
            ],
            proxyAPI: {
                read: App.globalConfig.path + '/usage/page'
            },
            listeners: {
                aftererror: function(operation, response) {
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
            fieldLabel: '配件编码',
            name: 'partCode',
            enableKeyEvents: true
        }, {
            xtype: 'textfield',
            fieldLabel: '配件名称',
            name: 'partName',
            enableKeyEvents: true
        }, {
            xtype: 'textfield',
            fieldLabel: 'FNA',
            name: 'supcfnaCode',
            enableKeyEvents: true
        }, {
            xtype: 'textfield',
            fieldLabel: '功能名称位置描述',
            name: 'supcfnaName',
            enableKeyEvents: true
        }, {
            xtype: 'basecombo',
            fieldLabel: '配图状态',
            name: 'legendStatus',
            withAll: true,
            value: '',
            url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=legend_status'
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
        items: [{
            xtype: 'paging',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            displayInfo: true
        }, {
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
        }]
    },
    columns: [{
        text: "序号",
        xtype: 'rownumberer',
        align: 'center',
        width: 60
    }, {
        text: '车系',
        dataIndex: 'seriesCode',
        width: 80
    }, {
        text: '配件编码',
        dataIndex: 'partCode',
        width: 120
    }, {
        text: '配件中文名称',
        dataIndex: 'partNameZh',
        width: 160
    }, {
        text: '配件英文名称',
        dataIndex: 'partNameEn',
        width: 160
    }, {
        text: 'FNA',
        dataIndex: 'supcfnaCode',
        width: 100
    }, {
        text: '功能名称位置中文描述',
        dataIndex: 'supcfnaNameZh',
        width: 160
    }, {
        text: '功能名称位置英文描述',
        dataIndex: 'supcfnaNameEn',
        width: 160
    }, {
        text: '用量',
        dataIndex: 'qty',
        width: 100
    }, {
        text: '配置',
        dataIndex: 'rpo',
        width: 140
    }, {
        text: '有效时间',
        dataIndex: 'startDate',
        width: 140,
        renderer: function(data, metadata, record) {
            var startDate = record.get('startDate');

            return Ext.util.Format.localDate(startDate);
        }
    }, {
        text: '失效时间',
        dataIndex: 'endDate',
        width: 140,
        renderer: function(data, metadata, record) {
            var endDate = record.get('endDate');

            return Ext.util.Format.localDate(endDate);
        }
    }, {
        text: '用法备注',
        dataIndex: 'usageNote',
        width: 160
    }]
});