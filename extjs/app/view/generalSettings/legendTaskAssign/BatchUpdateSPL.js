Ext.define('App.view.generalSettings.legendTaskAssign.BatchUpdateSPL', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '批量修改图例任务',
    doSave: function () {
        if (!this.getForm().isValid()) {
            return;
        }
        var me = this,
            params = me.getParams(),
            originalParams = me.params;

        me.setLoading(true);

        for (var i = 0; i < originalParams.length; i++) {

            originalParams[i].splCode = params.splCode;
        }

        Ext.util.Common.ajax({
            method: 'PUT',
            jsonData: originalParams,
            url: App.globalConfig.path + '/legend-task-allocation/modify-spl',
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
            value: '注：将勾选的图例分组批量修改为如上选择的SPL',
            isNotSubmit: true,
            fieldStyle: 'color:red;'
        }]
    }]
});