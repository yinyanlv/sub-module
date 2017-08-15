Ext.define('App.view.legendCatalog.assemblyLegendGroup.BatchUpdateLegendGroup', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '批量修改一级总成件-图例分组',
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
            url: App.globalConfig.path + '/legend/rootpart-group-manage/batch-edit-group',
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
            allowBlank: false,
            xtype: 'treecombo',
            fieldLabel: '图例分组',
            rootVisible: false,
            name: 'groupCode',
            canSelectFolders: false,
            isAllExpand: true,
            store: Ext.create('App.store.common.LegendGroup')
        }, {
            xtype: 'displayfield',
            isNotSubmit: true,
            value: '注：将勾选的一级总成件批量修改为以上分组',
            fieldStyle: 'color:red;'
        }]
    }]
});