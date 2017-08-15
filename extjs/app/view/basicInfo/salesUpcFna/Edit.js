Ext.define('App.view.basicInfo.salesUpcFna.Edit', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '售后FNA',
    updateDisableItems: ['code'],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

        if (me.editMode === 'create') {
            me.setFieldsDisabled(me.createDisableItems);
            me.setFieldsDisplay(me.createDisplayItems);
            me.addInputLine();
            me.enableAddButton();
        } else if (me.editMode === 'update') {
            me.setFieldsDisabled(me.updateDisableItems);
            me.setFieldsDisplay(me.updateDisplayItems);
        }

        window.legendStandardNameInputIndex = 1;
    },

    setRecord: function(params) {
        var me = this,
            formPanel = me.down("form"),
            legendStandardNameCode = params.get('legendStandardNameCode'),
            codeList = legendStandardNameCode ? legendStandardNameCode.split(',') : [];

        if (codeList.length > 0) {

            for (var i = 0; i < codeList.length; i++) {
                me.addInputLine(codeList[i]);
            }
        } else {

            me.addInputLine();
        }
        me.enableAddButton();
        formPanel.loadRecord(params);
    },

    addInputLine: function(value) {
        var me = this,
            standardNameWrapper = me.down('[itemId=standard-name-wrapper]'),
            index = window.legendStandardNameInputIndex++;

        standardNameWrapper.add({
            layout: 'hbox',
            action: 'row',
            margin: '5 0 0 0',
            items: [{
                name: 'legendStandardNameCode' + index,
                allowBlank: false,
                xtype: 'selectorfield',
                editable: false,
                width: 280,
                windowTitle: '选择图例标准名称',
                searchInputConfig: {
                    flex: 1,
                    labelPad: 10,
                    labelWidth: 100,
                    fieldLabel: '编码或名称',
                    toUppercase: true
                },
                value: value ? value : '',
                readUrl: App.globalConfig.path + '/legend-standard-name/page',
                fields: [{
                    name: 'code',
                    mapping: 'legendStandardNameCode' + index
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
                }]
            }, {
                xtype: 'linkbutton',
                action: 'del',
                text: '删除',
                title: '删除当前行',
                width: 30,
                margin: '6 0 0 20',
                handler: function() {
                    me.removeInputLine(this);
                    me.enableAddButton();
                }
            }, {
                xtype: 'linkbutton',
                action: 'add',
                text: '增加',
                title: '增加一行',
                width: 30,
                margin: '6 0 0 15',
                handler: function() {
                    me.addInputLine();
                    me.enableAddButton();
                }
            }]
        });
    },

    removeInputLine: function(that) {
        var me = this,
            standardNameWrapper = me.down('[itemId=standard-name-wrapper]'),
            row = that.up('[action=row]');

        if (standardNameWrapper.items.length > 1) {
            standardNameWrapper.remove(row);
        } else {
            Ext.Msg.alert('提示', '至少得保留一个图例标准名称输入框！');
        }
    },

    enableAddButton: function() {
        var me = this,
            standardNameWrapper = me.down('[itemId=standard-name-wrapper]'),
            items = standardNameWrapper.items.items;

        Ext.each(items, function(item, index) {
            if ((index + 1) < items.length) {
                item.down('[action=add]').hide();
            } else {
                item.down('[action=add]').show();
            }
        });
    },

    doSave: function() {
        if (!this.getForm().isValid()) {
            return;
        }

        var me = this,
            params;
        params = me.getParams();

        if (params.hasRepeatCode) {

            Ext.Msg.alert('提示', '存在重复的图例标准名称，请检查后重新选择');

            return;
        }
        me.setLoading(true);
        me.fireEvent('dosave', params);
    },

    getParams: function() {
        var me = this,
            params = {},
            items = me.getFormFields(),
            regex = /^legendStandardNameCode/,
            hasRepeatCode = false;

        params.legendStandardNameCodes = [];

        Ext.each(items, function(item) {
            if (item.isNotSubmit) return true;

            if (me.editMode === "create" && me.createNoSubmitFields.indexOf(item.name) > -1) {
                return true;
            }
            if (me.editMode === "update" && me.updateNoSubmitFields.indexOf(item.name) > -1) {
                return true;
            }

            if (regex.test(item.name)) {

                var val = item.getValue();

                for (var i = 0; i < params.legendStandardNameCodes.length; i++) {

                    if (val === params.legendStandardNameCodes[i]) {
                        hasRepeatCode = true;

                        return;
                    }
                }
                params.legendStandardNameCodes.push(val);
            } else {
                params[item.name] = item.getValue();
            }
        });

        if (hasRepeatCode) {
            return {
                hasRepeatCode: true
            };
        } else {
            return params;
        }
    },

    items: [{
        items: [{
            fieldLabel: '售后FNA',
            name: 'code'
        }, {
            fieldLabel: '售后功能名称位置中文描述',
            name: 'noteZh',
            maxLength: 200
        }, {
            fieldLabel: '售后功能名称位置英文描述',
            name: 'noteEn',
            maxLength: 200
        }, {
            xtype: 'treecombo',
            fieldLabel: '图例分组',
            rootVisible: false,
            name: 'legendGroupCode',
            canSelectFolders: false,
            isAllExpand: true,
            store: Ext.create('App.store.common.LegendGroup')
        }, {
            xtype: 'basecombo',
            fieldLabel: '推荐维修策略',
            name: 'servicePolicyCode',
            withAll: false,
            allowBlank: true,
            displayFormat:'{code}-{name}',
            url: App.globalConfig.path + '/combo/service-policy/list'
        }, {
            xtype: 'fieldset',
            layout: 'vbox',
            title: '图例标准名称',
            cls: 'edit-fieldset',
            itemId: 'standard-name-wrapper',
            items: []
        }]
    }]
});