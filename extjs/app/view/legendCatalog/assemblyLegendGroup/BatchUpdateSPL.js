Ext.define('App.view.legendCatalog.assemblyLegendGroup.BatchUpdateSPL', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '批量修改SPL',
    doSave: function () {
        if (!this.getForm().isValid()) {
            return;
        }
        var me = this,
            params = me.getParams();

        me.setLoading(true);

        params.rels = me.params;
        Ext.util.Common.ajax({
            method: 'PUT',
            jsonData: params,
            url: App.globalConfig.path + '/legend/rootpart-group-manage/batch-edit-spl',
            callback: function () {
                me.setLoading(false);
            },
            success: function () {
                me.fireEvent('updatefinished');
                me.close();
            }
        });
    },
    items: [{
        items: [{
            fieldLabel: 'SPL',
            name: 'splCode',
            xtype: 'basecombo',
            allowBlank: false,
            url: App.globalConfig.path + '/combo/user/list?type=SPL'
        }, {
            xtype: 'displayfield',
            isNotSubmit: true,
            value: '注：将勾选的一级总成件批量修改为如上选择的SPL',
            fieldStyle: 'color:red;'
        }]
    }]
});