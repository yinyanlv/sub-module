Ext.define('App.view.partEngineering.appendPartStructTask.AttachSeries', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '挂靠车系',
    updateDisableItems: [],
    doSave: function() {
        if (!this.getForm().isValid()) {
            return;
        }
        var me = this,
            params = me.getParams();

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/new-part-structure/attach-series',
            beforerequest: function() {
                me.setLoading(true);
            },
            callback: function() {
                me.setLoading(false);
            },
            success: function() {
                me.fireEvent('updatefinished');
                me.close();
            }
        });
    },

    items: [{
        defaults: {
            xtype: 'displayfield',
            allowBlank: true
        },
        items: [{
            fieldLabel: '配件编码',
            name: 'partCode'
        }, {
            fieldLabel: '配件中文名称',
            name: 'partNameZh'
        }, {
            fieldLabel: '配件英文名称',
            name: 'partNameEn'
        }, {
            fieldLabel: '品牌',
            xtype: 'basecombo',
            name: 'brandCode',
            withAll: false,
            allowBlank: false,
            multiSelect: true,
            url: App.globalConfig.path + '/combo/brand/list',
            clearFields: ['seriesCode']
        }, {
            fieldLabel: '车系',
            xtype: 'basecombo',
            name: 'seriesCode',
            withAll: false,
            allowBlank: false,
            multiSelect: true,
            dependFields: ['brandCode'],
            url: App.globalConfig.path + '/combo/multi-brand-series/list?type={brandCode}'
        }, {
            fieldLabel: '产品FNA',
            name: 'pupcfnaCode',
            xtype: 'selectorfield',
            allowBlank: false,
            editable: false,
            windowTitle: '选择产品FNA',
            searchInputConfig: {
                flex: 1,
                labelPad: 10,
                labelWidth: 100,
                fieldLabel: '产品FNA',
                toUppercase: true
            },
            readUrl: App.globalConfig.path + '/pupcfna/page',
            fields: [{
                name: 'code',
                mapping: 'pupcfnaCode'
            }, {
                name: 'noteZh'
            }, {
                name: 'noteEn'
            }],
            paramFields: ['code'],
            columns: [{
                text: "序号",
                xtype: 'rownumberer',
                align: 'center',
                width: 60
            }, {
                text: '产品FNA',
                dataIndex: 'code',
                flex: 1
            }, {
                text: '产品功能地址中文描述',
                dataIndex: 'noteZh',
                flex: 1
            }, {
                text: '产品功能地址英文描述',
                dataIndex: 'noteEn',
                flex: 1
            }]
        }, {
            xtype: 'textfield',
            name: 'rpo',
            fieldLabel: 'RPO（配置）',
            maxLength: 200
        }, {
            xtype: 'numberfield',
            fieldLabel: '单车用量',
            name: 'qty',
            minValue: 0,
            maxValue: 99999999
        }]
    }]
});