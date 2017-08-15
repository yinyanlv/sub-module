Ext.define('App.view.legendCatalog.legendHotpointUsage.Copy', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '复制图例热点用法',
    width: 500,
    initComponent: function() {
        var me = this;

        me.callParent(arguments);
        me.setRecord(me.params);
    },
    doSave: function () {
        if (!this.getForm().isValid()) {
            return;
        }
        var me = this,
            params = me.getParams();

        me.setLoading(true);

        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: {
                srcLegendCode: params.legendCode,
                dstLegendCode: params.newLegendCode
            },
            url: App.globalConfig.path + '/legend/callout-fna-manage/copy',
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
        defaults: {
            xtype: "textfield",
            margin: '0 0 5 0',
            labelWidth: 150,
            labelPad: 10,
            readOnly: true,
            allowBlank: true
        },
        items: [{
            fieldLabel: '复制源图例编码',
            name: 'legendCode'
        }, {
            fieldLabel: '复制源图例名称',
            name: 'legendName'
        }, {
            fieldLabel: '复制源图例标准名称编码',
            name: 'standardCode'
        }, {
            fieldLabel: '复制源图例标准名称',
            name: 'standardName'
        }, {
            fieldLabel: '复制后图例编码',
            name: 'newLegendCode',
            xtype: 'selectorfield',
            readOnly: false,
            editable: false,
            allowBlank: false,
            windowTitle: '选择图例编码',
            searchInputConfig: {
                flex: 1,
                labelPad: 10,
                labelWidth: 100,
                fieldLabel: '编码或名称',
                toUppercase: true
            },
            readUrl: App.globalConfig.path + '/legend-file/page',
            fields: [{
                name: 'code',
                mapping: 'newLegendCode'
            }, {
                name: 'nameZh'
            }, {
                name: 'nameEn'
            }, {
                name: 'legendStandardCode',
                mapping: 'newLegendStandardCode'
            }, {
                name: 'legendStandardNameZh'
            }, {
                name: 'legendStandardNameEn'
            }],
            paramFields: ['codeOrName'],
            columns: [{
                text: "序号",
                xtype: 'rownumberer',
                align: 'center',
                width: 60
            }, {
                text: '图例编码',
                dataIndex: 'code',
                width: 140
            }, {
                text: '图例编码中文名称',
                dataIndex: 'nameZh',
                width: 160
            }, {
                text: '图例编码英文名称',
                dataIndex: 'nameEn',
                width: 160
            }, {
                text: '图例标准名称编码',
                dataIndex: 'legendStandardCode',
                width: 140
            }, {
                text: '图例标准中文名称',
                dataIndex: 'legendStandardNameZh',
                width: 160
            }, {
                text: '图例标准英文名称',
                dataIndex: 'legendStandardNameEn',
                width: 160
            }],
            listeners: {
                selectionchange: function (that, record) {
                    var data = record.data,
                        form = this.up('form').getForm(),
                        legendName = (data.nameZh || '' ) + '_' + (data.nameEn || '' ),
                        legendStandardName = (data.legendStandardNameZh || '' ) + '_' + (data.legendStandardNameEn || '' );

                    form.findField('newLegendName').setValue(legendName);
                    form.findField('newLegendStandardName').setValue(legendStandardName);
                }
            }
        }, {
            fieldLabel: '复制后图例名称',
            name: 'newLegendName'
        }, {
            fieldLabel: '复制后图例标准名称编码',
            name: 'newLegendStandardCode'
        }, {
            fieldLabel: '复制后图例标准名称',
            name: 'newLegendStandardName'
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
            text: "复制"
        }, {
            xtype: 'button',
            action: "cancel",
            text: "取消"
        }]
    }]
});