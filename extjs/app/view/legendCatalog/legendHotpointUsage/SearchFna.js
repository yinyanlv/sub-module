Ext.define('App.view.legendCatalog.legendHotpointUsage.SearchFna', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.legendhotpointusagesearchfna',
    requires: ['Ext.ux.component.paging.Paging'],
    multiSelect: true,
    multiSelectCheckbox: true,
    autoDestroy: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    extraFilters: [],
    notResetFields: [],
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
            Ext.Msg.alert('提示', '请选择一条售后FNA记录');

            return;
        }

        me.fireEvent('selectedrecords', selections[0]);
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
                'noteZh',
                'noteEn'
            ],
            proxyAPI: {
                read: App.globalConfig.path + '/supcfna/page'
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
            fieldLabel: '售后FNA',
            name: 'code'
        }, {
            fieldLabel: '功能名称位置描述',
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
        text: '售后FNA',
        dataIndex: 'code',
        width: 140
    }, {
        text: '功能名称位置中文描述',
        dataIndex: 'noteZh',
        flex: 1
    }, {
        text: '功能名称位置英文描述',
        dataIndex: 'noteEn',
        flex: 1
    }]
});