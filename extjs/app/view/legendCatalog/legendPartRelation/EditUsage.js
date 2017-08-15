Ext.define('App.view.legendCatalog.legendPartRelation.EditUsage', {
    extend: 'Ext.ux.component.edit.Base',
    alias: 'widget.legendpartrelationeditusage',
    width: 900,
    listeners: {
        afterrender: function() {
            this.bindData();
            this.controlFieldStatus();
            this.addEvents();
        }
    },

    controlFieldStatus: function() {
        var me = this,
            tbCallout = me.down('[name=callout]');

        if (Ext.isEmpty(tbCallout.getValue())) {
            tbCallout.setDisabled(false);
        } else {
            tbCallout.setDisabled(true);
        }
    },

    addEvents: function() {
        var me = this,
            btnInherit = me.down('[itemId=inherit]');

        btnInherit.on('click', function() {
            me.structNoteToUsageNote();
        });
    },

    structNoteToUsageNote: function() {
        var me = this,
            tbUsageNote = me.down('[name=usageNote]'),
            tbStructureNote = me.down('[name=structureNote]');

        tbUsageNote.setValue(tbStructureNote.getValue());
    },

    bindData: function() {
        var me = this,
            form = me.down('form').getForm();

        form.loadRecord(me.record);
    },

    doSave: function() {
        var me = this,
            params = me.getParams(),
            form = me.down('form').getForm();

        if (!form.isValid()) return;

        Ext.util.Common.ajax({
            url: App.globalConfig.path + '/legend-part-manage/update-with-check',
            method: 'POST',
            jsonData: params,
            beforerequest: function() {
                me.setLoading('提示', '保存中...');
            },
            callback: function() {
                me.setLoading(false);
            },
            success: function(root) {
                me.finishSaved(root);
            }
        });
    },

    finishSaved: function(root) {
        var me = this;

        if (root.success) {
            Ext.Msg.alert('提示', '保存成功');
            me.fireEvent('savefinished');
            me.close();
        } else {
            Ext.Msg.confirm('提示', root.message, function(btn) {
                if (btn === 'yes') {
                    me.redoSave();
                } else {
                    me.close();
                }
            });
        }
    },

    redoSave: function() {
        var me = this,
            params = me.getParams();

        Ext.util.Common.ajax({
            url: App.globalConfig.path + '/legend-part-manage/update',
            method: 'POST',
            jsonData: params,
            beforerequest: function() {
                me.setLoading('提示', '保存中...');
            },
            callback: function() {
                me.setLoading(false);
            },
            success: function(root) {
                Ext.Msg.alert('提示', '保存成功');
                me.fireEvent('savefinished');
                me.close();
            }
        });
    },

    getParams: function() {
        var me = this,
            form = me.down('form').getForm(),
            values = form.getValues(),
            tbCallout = form.findField('callout');

        return {
            legendCode: me.legendCode,
            partCode: me.record.get('partCode'),
            supcfnaCode: me.record.get('supcfnaCode'),
            usageCode: me.record.get('usageCode'),
            callout: tbCallout.getValue(),
            rpo: values.rpo,
            splNote: values.splNote,
            usageNote: values.usageNote
        };
    },

    items: [{
        xtype: 'form',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            layout: 'hbox',
            margin: '0 0 5 0',
            defaults: {
                disabled: true,
                width: 275,
                labelWidth: 140,
                margin: '0 10 0 0'
            }
        },
        items: [{
            items: [{
                xtype: 'textfield',
                fieldLabel: '图内序号',
                allowBlank: false,
                readOnly: false,
                name: 'callout',
                disabled: false
            }, {
                xtype: 'textfield',
                fieldLabel: '系统推荐图内序号',
                name: 'recommendCallout'
            }]
        }, {
            items: [{
                xtype: 'textfield',
                fieldLabel: '配件编码',
                name: 'partCode'
            }, {
                xtype: 'textfield',
                fieldLabel: '配件名称',
                name: 'partNameZh'
            }, {
                xtype: 'textfield',
                fieldLabel: '配件备注(STE)',
                name: 'steNote'
            }]
        }, {
            items: [{
                xtype: 'textfield',
                fieldLabel: '配件FNA',
                name: 'supcfnaCode'
            }, {
                xtype: 'textfield',
                fieldLabel: '配件功能名称位置描述',
                name: 'supcfnaNoteZh'
            }, {
                xtype: 'textfield',
                fieldLabel: '配件备注(DRE)',
                name: 'dreNote'
            }]
        }, {
            items: [{
                xtype: 'textfield',
                fieldLabel: '热点FNA',
                name: 'calloutSupcfnaCode'
            }, {
                xtype: 'textfield',
                fieldLabel: '热点功能名称位置描述',
                name: 'calloutSupcfnaNoteZh'
            }, {
                xtype: 'textfield',
                fieldLabel: '配件备注(SAP)',
                name: 'sapNote'
            }]
        }, {
            items: [{
                xtype: 'textarea',
                fieldLabel: '用法备注',
                disabled: false,
                name: 'usageNote',
                maxLength: 500
            }, {
                xtype: 'textarea',
                fieldLabel: '配置',
                disabled: false,
                name: 'rpo',
                maxLength: 500
            }, {
                xtype: 'textarea',
                fieldLabel: '配件备注（SPL）',
                disabled: false,
                name: 'splNote',
                maxLength: 500
            }]
        }, {
            items: [{
                xtype: 'textfield',
                fieldLabel: '结构备注',
                itemId: 'struct-note',
                name: 'structureNote'
            }, {
                xtype: 'linkbutton',
                text: '继承',
                title: '继承',
                margin: '5 50 0 10',
                itemId: 'inherit',
                width: 40,
                disabled: false
            }]
        }, {
            items: [{
                xtype: 'textfield',
                fieldLabel: '用量',
                name: 'qty'
            }, {
                xtype: 'textfield',
                fieldLabel: '生效时间',
                name: 'startDate'
            }, {
                xtype: 'textfield',
                fieldLabel: '失效时间',
                name: 'endDate'
            }]
        }]
    }]
});