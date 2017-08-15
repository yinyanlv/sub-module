Ext.define('App.view.basicInfo.legendInfo.Edit', {
    extend: 'Ext.ux.component.edit.Edit',
    requires: ['Ext.ux.component.field.ImageField'],
    title: '图例信息',
    updateDisableItems: ['code'],
    updateDisplayItems: ['photoOriginalFilename'],
    itemId: 'edit',
    width: 700,
    layout: 'hbox',
    defaults: {
        flex: 1,
        xtype: 'form',
        margin: '0 10 0 0',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        autoScroll: true,
        defaults: {
            xtype: "textfield",
            margin: '0 0 5 0',
            labelWidth: 120,
            maxLength: 50,
            allowBlank: false
        },
        border: false
    },
    constructor: function(config) {
        var me = this;

        if (config.editMode === 'update') {
            me.items[0].items[7].allowBlank = true;

        } else {
            me.items[0].items[7].allowBlank = false;
        }
        me.callParent(arguments);
    },
    initEvents: function () {
        var me = this,
            btn = me.down('[itemId=upload-image]'),
            imageField = me.down('imagefield'),
            fileId = me.down('[itemId=file-id]');

        btn.on('click', function () {
            var dialog = Ext.create('App.view.basicInfo.legendInfo.UploadImage', {
                autoShow: true,
                params: {}
            });

            dialog.on('uploadsuccess', function (params) {

                fileId.setValue(params.id || '');
                imageField.setSrc(App.globalConfig.photoTmpFileRestPrefix + params.photoUltimatelyFilename + '?_dc=' + Math.random());
            });

            dialog.on('uploadFailure', function () {

                Ext.Msg.alert('提示', '图片预览失败');
            });
        });

        me.callParent(me);
    },
    doSave: function() {
        var me = this,
            params = me.getParams();

        if (!this.getForm().isValid()) {
            return;
        }

        if (me.editMode === 'create' && !params.photoTmpFileId) {

            Ext.Msg.alert('提示', '请选择该图例信息对应的SVG图');

            return;
        }

        me.setLoading(true);
        me.fireEvent('dosave', params);
    },
    items: [{
        items: [{
            fieldLabel: '图例编码',
            name: 'code',
            maxLength: 50
        }, {
            xtype: 'treecombo',
            fieldLabel: '图例分组:',
            rootVisible: false,
            name: 'groupCode',
            canSelectFolders: false,
            isAllExpand: true,
            store: Ext.create('App.store.common.LegendGroup')
        }, {
            fieldLabel: '图例中文名称',
            name: 'nameZh',
            maxLength: 200
        }, {
            fieldLabel: '图例英文名称',
            name: 'nameEn',
            maxLength: 200,
            allowBlank: true
        }, {
            fieldLabel: '图例标准名称编码',
            name: 'legendStandardCode',
            allowBlank: false,
            xtype: 'selectorfield',
            editable: false,
            windowTitle: '选择图例标准名称',
            searchInputConfig: {
                flex: 1,
                labelPad: 10,
                labelWidth: 100,
                fieldLabel: '编码或名称',
                toUppercase: true
            },
            readUrl: App.globalConfig.path + '/legend-standard-name/page',
            fields: [{
                name: 'code',
                mapping: 'legendStandardCode'
            }, {
                name: 'nameZh'
            }, {
                name: 'nameEn'
            }],
            paramFields: ['codeOrName'],
            columns: [{
                text: "序号",
                xtype: 'rownumberer',
                align: 'center',
                width: 60
            }, {
                text: '图例标准名称编码',
                dataIndex: 'code',
                flex: 1
            }, {
                text: '图例标准中文名称',
                dataIndex: 'nameZh',
                flex: 1
            }, {
                text: '图例标准英文名称',
                dataIndex: 'nameEn',
                flex: 1
            }],
            listeners: {
                selectionchange: function(that, record) {
                    var data = record.data,
                        form = this.up('form').getForm(),
                        legendStandardName = (data.code || '') + '_' + (data.nameZh || '') + '_' + (data.nameEn || '');

                    form.findField('legendStandardName').setValue(legendStandardName);
                }
            }
        }, {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: '图例标准名称',
            name: 'legendStandardName',
            isNotSubmit: true,
            allowBlank: true
        }, {
            fieldLabel: '图例备注',
            name: 'note',
            maxLength: 500,
            allowBlank: true
        }, {
            xtype: 'displayfield',
            fieldLabel: '当前图例',
            name: 'photoOriginalFilename',
            allowBlank: true,
            value: '',
            renderer: function(val) {
                var me = this,
                    params = me.up('[itemId=edit]').getParams();

                if (!val) {
                    return;
                } else {

                    if (params.photoUltimatelyFilename) {
                        var src = App.globalConfig.legendImgRestPrefix + params.photoUltimatelyFilename;

                        return '<a href="' + src + '" target="_blank">'+ val +'</a>';
                    } else {
                        return;
                    }
                }
            },
            hidden: true,
            isNotSubmit: true
        }, {
            xtype: 'hidden',
            name: 'photoUltimatelyFilename'
        }, {
            xtype: 'hidden',
            itemId: 'file-id',
            name: 'photoTmpFileId'
        }]
    }, {
        items: [{
            xtype: 'displayfield',
            fieldLabel: '预览图片',
            allowBlank: true,
            isNotSubmit: true
        }, {
            xtype: 'imagefield',
            cdnPath: App.globalConfig.legendImgRestPrefix,
            name: 'temp',
            boxWidth: 220,
            boxHeight:220,
            nopicPath: App.globalConfig.path + '/styles/images',
            noImgFile: 'no_img.png',
            isNotSubmit: true,
            listeners: {
                afterrender: function () {
                    var me = this,
                        params = me.up('[itemId=edit]').getParams();

                    if (params.photoUltimatelyFilename) {
                        me.setSrc(App.globalConfig.legendImgRestPrefix + params.photoUltimatelyFilename + '?_dc=' + Math.random());
                    }
                }
            }
        }, {
            xtype: 'button',
            text: '选择图片',
            itemId: 'upload-image',
            margin: '0 30 0 30',
            isNotSubmit: true
        }]
    }]
});
