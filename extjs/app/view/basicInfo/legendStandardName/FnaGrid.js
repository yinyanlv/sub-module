Ext.define('App.view.basicInfo.legendStandardName.FnaGrid', {
    extend: 'Ext.ux.component.edit.Base',
    title: '图例包含FNA清单',
    width: 700,
    bodyPadding: '5',
    initEvents: function () {
        var me = this;

        this.callParent(arguments);
    },
    listeners: {
        afterrender: function () {
            var me = this;

            me.getGridData();
        },
        close: function () {
            var me = this,
                grid = me.down('grid'),
                store = grid.getStore();

            store.removeAll();
        }
    },

    getGridData: function () {
        var me = this,
            code = me.legendStandardCode;

        Ext.util.Common.ajax({
            url: App.globalConfig.path + '/legend-standard-name/query-supcfna?code=' + code,
            method: 'GET',
            disableCaching: true,
            beforerequest: function () {
                me.setLoading('加载中...');
            },
            callback: function () {
                me.setLoading(false);
            },
            success: function (result) {
                me.bindGridData((result && result.list) || []);
            }
        });
    },

    bindGridData: function (result) {
        var me = this,
            grid = me.down('grid'),
            store = grid.getStore();

        store.loadData(result);
    },

    items: [{
        items: [{
            xtype: 'grid',
            itemId: 'grid-recourse',
            height: 250,
            layout: 'fit',
            border: true,
            store: Ext.create('Ext.data.Store', {
                fields: [{
                    name: 'code'
                }, {
                    name: 'noteZh'
                }, {
                    name: 'noteEn'
                }],
                proxy: {
                    type: 'memory'
                }
            }),
            columns: [{
                text: "序号",
                xtype: 'rownumberer',
                width: 80,
                align: 'center'
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
        }]
    }],
    dockedItems: null
});