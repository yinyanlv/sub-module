Ext.define('App.view.legendCatalog.legendPartRelation.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.legendpartrelationgrid',
    store: Ext.create('App.store.legendCatalog.LegendPartRelation'),
    flex: 1,
    width: "100%",
    ui: 'grid',
    viewConfig: {
        enableTextSelection: true
    },

    selModel: {
        selType: 'checkboxmodel',
        injectCheckbox: 0
    },

    initEvents: function() {
        var me = this,
            buttons = me.query('button[action]');

        me.on('selectionchange', function(that, selected, eOpts) {
            me.selectRow(that, selected, eOpts);
        });

        Ext.each(buttons, function(item) {
            item.on('click', function(that) {
                me.fireEvent("toolbarclick", that);
            });
        });
    },

    selectRow: function(that, selected, eOpts) {
        var me = this;

        me.controlToolbarStatus(that, selected, eOpts);
    },

    controlToolbarStatus: function(that, selected, eOpts) {
        var me = this,
            btnEdit = me.down('[action=edit]'),
            btnDelete = me.down('[action=delete]'),
            btnEnsureRecommend = me.down('[action=ensure-recommend]');

        if (selected.length > 0) {
            btnDelete.setDisabled(false);
            btnEnsureRecommend.setDisabled(false);
        } else {
            btnDelete.setDisabled(true);
            btnEnsureRecommend.setDisabled(true);
        }

        if (selected.length == 1) {
            btnEdit.setDisabled(false);
        } else {
            btnEdit.setDisabled(true);
        }
    },

    highlightCallout: function(callout) {
        var me = this,
            records = [],
            lastIndex = null,
            store = me.getStore(),
            selectionModel = me.getSelectionModel();

        selectionModel.deselectAll();

        store.each(function(rec, index) {
            if (rec.get('callout') === callout) {
                selectionModel.select(index, true);
                lastIndex = index;
            }
        });

        if (lastIndex !== null) {
            me.getView().focusRow(lastIndex);
        }
    },
    tbar: [{
        iconCls: 'x-fa fa-edit',
        text: '修改',
        tooltip: '修改',
        action: 'edit',
        disabled: true,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-trash-o',
        text: '删除',
        tooltip: '删除',
        action: 'delete',
        disabled: true,
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '确认系统推荐关系',
        tooltip: '确认系统推荐关系',
        disabled: true,
        action: 'ensure-recommend',
        ui: 'grid-toolbar'
    }, {
        iconCls: 'x-fa fa-edit',
        text: '加入用法',
        tooltip: '加入用法',
        action: 'add-usage',
        ui: 'grid-toolbar'
    }],
    columns: [{
        text: '图内序号',
        dataIndex: 'callout',
        width: 90,
        locked: true
    }, {
        text: '配件编码',
        dataIndex: 'partCode',
        width: 140,
        locked: true
    }, {
        text: '系统推荐图内序号',
        dataIndex: 'recommendCallout',
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
        text: '售后FNA',
        dataIndex: 'supcfnaCode',
        width: 120
    }, {
        text: '配件功能名称位置中文描述',
        dataIndex: 'supcfnaNoteZh',
        width: 180
    }, {
        text: '配件功能名称位置英文描述',
        dataIndex: 'supcfnaNoteEn',
        width: 180
    }, {
        text: '热点FNA',
        dataIndex: 'calloutSupcfnaCode',
        width: 120
    }, {
        text: '热点功能名称位置中文描述',
        dataIndex: 'calloutSupcfnaNoteEn',
        width: 180
    }, {
        text: '热点功能名称位置英文描述',
        dataIndex: 'calloutSupcfnaNoteZh',
        width: 180
    }, {
        text: '一级总成件号',
        dataIndex: 'rootPartCode',
        width: 100
    }, {
        text: '配置',
        dataIndex: 'rpo',
        width: 140
    }, {
        text: '生效时间',
        dataIndex: 'startDate',
        width: 140
    }, {
        text: '失效时间',
        dataIndex: 'endDate',
        width: 140
    }, {
        text: '用法备注',
        dataIndex: 'usageNote',
        width: 160
    }, {
        text: '维修策略',
        dataIndex: 'servicePolicyName',
        width: 140
    }, {
        text: '配件备注（SPL）',
        dataIndex: 'splNote',
        width: 160
    }]
});