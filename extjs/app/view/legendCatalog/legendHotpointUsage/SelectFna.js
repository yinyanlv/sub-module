Ext.define('App.view.legendCatalog.legendHotpointUsage.SelectFna', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.legendhotpointusageselectfna',
    multiSelect: true,
    multiSelectCheckbox: true,
    autoDestroy: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    extraFilters: [],
    constructor: function (config) {
        var me = this;

        me.createStore(config);
        me.callParent(arguments);
    },
    initEvents: function () {
        var me = this,
            btnEnsure = me.down('[action=ensure]');

        btnEnsure.on('click', function () {
            me.doEnsure();
        });

        this.loadData();
    },
    createStore: function (config) {
        var me = this;

        me.store = Ext.create('Ext.ux.store.Base', {
            fields: [
                'code',
                'noteZh',
                'noteEn'
            ]
        });
    },
    loadData: function() {
        var me = this;

        me.setLoading(true);
        Ext.util.Common.ajax({
            method: 'GET',
            disableCaching: true,
            url: App.globalConfig.path + '/legend/callout-fna-manage/getFnas?legendCode=' + me.params.legendCode,
            callback: function() {
                me.setLoading(false);
            },
            success: function (res) {
                me.bindData(res.list || []);
            }
        });
    },
    bindData: function (data) {
        var me = this;

        me.store.loadData(data);
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
    tbar: null,
    bbar: {
        layout: 'form',
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        defaults: {
            border: false
        },
        items: [
            {
                xtype: 'toolbar',
                border: false,
                margin: '5 0 0 0',
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
    autoScroll: true,
    store: Ext.create('Ext.data.Store', {
        field: [
            'code',
            'noteZh',
            'noteEn'
        ],
        data: []
    }),
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