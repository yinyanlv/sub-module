Ext.define('App.view.legendCatalog.legendTaskDetail.AutoAssign', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '系统自动配图',
    updateDisableItems: [],
    doSave: function () {
        if (!this.getForm().isValid()) {
            return;
        }
        var me = this,
            params = me.getParams();

        me.setLoading(true);

        Ext.util.Common.ajax({
            method: 'POST',
            url: App.globalConfig.path + ' /legend/task-detail/generate-recommend-legend',
            jsonData: params.seriesCode,
            callback: function () {
                me.setLoading(false);
            },
            success: function () {
                me.fireEvent('autoassignfinished');
                me.close();
            }
        });
    },
    items: [{
        items: [{
            xtype: 'basecombo',
            fieldLabel: '品牌',
            name: 'brandCode',
            url: App.globalConfig.path + '/combo/brand/list',
            clearFields: ['seriesCode']
        }, {
            xtype: 'basecombo',
            fieldLabel: '车系',
            name: 'seriesCode',
            multiSelect: true,
            dependFields: ['brandCode'],
            url: App.globalConfig.path + '/combo/brand-series/list?parentCode={brandCode}'
        }]
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        margin: "5 0 12 0",
        defaults: {
            width: 80
        },
        layout: {
            align: 'middle',
            pack: 'center',
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            action: "save",
            text: "生成"
        }, {
            xtype: 'button',
            action: "cancel",
            text: "取消"
        }]
    }]
});