Ext.define('App.view.basicInfo.legendGroup.Edit', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '图例分组',
    formSubmit: true,
    updateDisableItems: ['code'],
    createDisplayItems: ['rule'],
    updateDisplayItems: ['thumbnailOriginalName'],
    itemId: 'edit',
    constructor: function(config) {
        var me = this;

        if (config.editMode === 'update') {
            me.items[0].items[4].allowBlank = true;
            me.height = 400;
        } else {
            me.items[0].items[4].allowBlank = false;
        }

        me.callParent(arguments);
    },
    items: [{
        items: [{
            fieldLabel: '图例分组编码',
            name: 'code',
            maxLength: 50
        }, {
            hidden: true,
            xtype: 'displayfield',
            isNotSubmit: true,
            name: 'rule',
            value: '编码规则：一级分组采用两位字符，如00;二级分组的编码例子，如00_01',
            fieldStyle: 'color:red;'
        }, {
            fieldLabel: '图例分组中文描述',
            name: 'noteZh',
            maxLength: 200
        }, {
            fieldLabel: '图例分组英文描述',
            name: 'noteEn',
            maxLength: 200,
            allowBlank: true
        }, {
            xtype: 'filefield',
            fieldLabel: '缩略图',
            name: 'file',
            buttonText: '浏览',
            anchor: '100%',
            msgTarget: 'under',
            maxLength: 200
        }, {
            xtype: 'displayfield',
            fieldLabel: '当前缩略图',
            name: 'thumbnailOriginalName',
            allowBlank: true,
            isNotSubmit: true,
            renderer: function (val) {
                var me = this,
                    params = me.up('[itemId=edit]').getParams();

                if (!val) {
                    return;
                } else {
                    if (params.thumbnailUltimatelyName) {
                        var src = App.globalConfig.legendGroupImgRestPrefix + params.thumbnailUltimatelyName;
                        return '<a href="' + src + '" target="_blank"><img style="display: block;width:150px;" src="'+ src +'" title="'+ val +'" /></a>';
                    } else {
                        return;
                    }
                }

            },
            hidden: true
        }, {
            xtype: 'hidden',
            name: 'thumbnailUltimatelyName'
        }]
    }]
});