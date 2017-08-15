Ext.define('App.view.partEngineering.partPhoto.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '配件照片',
    formSubmit: true,
	updateDisableItems: ['partCode'],
    updateDisplayItems: ['photoOriginalFilename'],
    itemId: 'edit-form',
    setRecord: function(params) {
        var me = this,
            formPanel = me.down("form");

        formPanel.loadRecord(params);

        if (me.editMode === 'update') {
           me.setPhotoCount();
        }
    },
    setPhotoCount: function () {
        var me = this,
            form = me.getForm(),
            code =  Ext.util.Format.trim(form.findField('partCode').getValue()),
            count = form.findField('count'),
            str = '提示：当前配件已上传图片数为: {num} （最大可上传数为5张）';

        if (!code) {
            count.setValue(str.replace(/\{num\}/, 0));

            return;
        }
        Ext.util.Common.ajax({
            url: App.globalConfig.path + '/part-photo/get-photo-count?partCode=' + code,
            method: 'GET',
            disableCaching: true,
            beforerequest: function() {
                me.setLoading(true);
            },
            callback: function() {
                me.setLoading(false);
            },
            success: function(res) {
                count.setValue(str.replace(/\{num\}/, res.result || 0));
            },
            failure: function (res) {
                Ext.Msg.alert('提示', '配件已上传图片数加载失败');
            }
        });
    },
	items: [{
        items: [{
            fieldLabel: '配件编码',
            name: 'partCode',
            maxLength: 50,
            listeners: {
                blur: function () {
                    this.up('[itemId=edit-form]').setPhotoCount();
                }
            }
        }, {
            xtype: 'displayfield',
            name: 'count',
            isNotSubmit: true,
            fieldStyle: 'color:red;',
            value: '提示：当前配件已上传图片数为: 0 （最大可上传数为5张）'
        }, {
            xtype: 'filefield',
            fieldLabel: '配件照片',
            name: 'file',
            buttonText: '浏览',
            anchor: '100%',
            msgTarget:'under',
            regex: /\.(png)$|\.(jpg)$|\.(jpeg)$|\.(bmp)$/i,
            regexText: '上传文件后缀必须是(png、jpg、jpeg、bmp)'
        }, {
            xtype: 'displayfield',
            fieldLabel: '当前文件',
            name: 'photoOriginalFilename',
            allowBlank: true,
            value: '',
            hidden: true
        }, {
            xtype: 'hiddenfield',
            name: 'id'
        }]
    }]
});