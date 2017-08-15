Ext.define('App.view.legendCatalog.legendHotpointUsage.LegendUsageEdit', {
    extend: 'Ext.ux.component.edit.Base',
    requires: [
        'App.view.legendCatalog.legendHotpointUsage.SearchFna',
        'App.view.legendCatalog.legendHotpointUsage.SelectFna'
    ],
    title: '编辑图例热点用法',
    width: 880,
    maxHeight: 650,
    bodyPadding: '10 10 5 10',
    initEvents: function() {

        this.callParent(arguments);
        this.loadData();
    },
    doSave: function() {
        var me = this,
            params = me.getParams();

        if (!me.doValidate()) {
            Ext.Msg.alert('提示', '存在售后FNA为空的热点，请检查');
            return;
        }
        me.setLoading(true);
        Ext.util.Common.ajax({
            method: 'POST',
            jsonData: params,
            url: App.globalConfig.path + '/legend/callout-fna-manage/update',
            callback: function() {
                me.setLoading(false);
            },
            success: function() {
                me.fireEvent('updatefinished');
                me.close();
            }
        });
    },
    getParams: function() {
        var me = this,
            grid = me.down('grid'),
            store = grid.getStore(),
            records = [];

        store.each(function(rec) {
            var temp = {};

            temp.callout = rec.get('callout');
            temp.supcfnaCode = rec.get('supcfnaCode');
            temp.legendCode = me.params.get('legendCode');

            records.push(temp);
        });

        return records;
    },
    doValidate: function() {
        var me = this;
        grid = me.down('grid'),
            store = grid.getStore(),
            isValid = true;

        store.each(function(rec) {
            if (!rec.get('supcfnaCode')) {
                isValid = false;
            }
        });

        return isValid;
    },

    loadData: function() {
        var me = this;

        me.setLoading(true);
        Ext.util.Common.ajax({
            method: 'GET',
            disableCaching: true,
            url: App.globalConfig.path + '/legend/callout-fna-manage/getLegendInfo?legendCode=' + me.params.get('legendCode'),
            callback: function() {
                me.setLoading(false);
            },
            success: function(res) {
                var data = res.result;
                data.legendName = (data.nameZh || '') + '_' + (data.nameEn || '');
                data.legendStandardName = (data.legendStandardNameZh || '') + '_' + (data.legendStandardNameEn || '');
                me.bindData(data);
            }
        });
    },
    bindData: function(data) {
        var me = this,
            form = this.down('form').getForm();

        form.setValues(data);
        me.setLegend(data.photoUltimatelyFilename);
        me.setGrid(data.calloutFnas || []);
    },
    setLegend: function(legendName) {
        var me = this,
            imagefield = me.down('imagefield'),
            url = App.globalConfig.legendImgRestPrefix + legendName;

        imagefield.url = url;
        imagefield.loadImage();
    },
    setGrid: function(data) {
        var me = this;
        grid = me.down('grid'),
            store = grid.getStore();

        store.loadData(data);
        me.initGridEvents();
    },
    initGridEvents: function() {
        var me = this,
            grid = me.down('grid');

        grid.on({
            cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {

                if (e.getTarget('[data-action=select]')) {
                    me.showSelectFna(record);
                }

                if (e.getTarget('[data-action=find]')) {
                    me.showSearchFna(record);
                }
            }
        });
    },
    showSelectFna: function(record) {
        var me = this,
            dialog;

        dialog = Ext.create('Ext.window.Window', {
            width: 795,
            height: 520,
            modal: true,
            resizable: false,
            autoShow: true,
            title: '选择售后FNA',
            layout: 'fit',
            items: [{
                xtype: 'legendhotpointusageselectfna',
                params: {
                    legendCode: me.params.get('legendCode')
                },
                listeners: {
                    selectedrecords: function(params) {
                        me.updateRecord(record, params);
                        dialog.close();
                    }
                }
            }]
        });
    },
    showSearchFna: function(record) {
        var me = this,
            dialog;

        dialog = Ext.create('Ext.window.Window', {
            width: 795,
            height: 520,
            modal: true,
            resizable: false,
            autoShow: true,
            title: '查找售后FNA',
            layout: 'fit',
            items: [{
                xtype: 'legendhotpointusagesearchfna',
                params: record
            }]
        });

        dialog.down('legendhotpointusagesearchfna').on('selectedrecords', function(params) {

            me.updateRecord(record, params);
            dialog.close();
        });
    },
    updateRecord: function(record, params) {
        var me = this;

        record.set('supcfnaCode', params.get('code'));
        record.set('supcfnaNoteEn', params.get('noteEn'));
        record.set('supcfnaNoteZh', params.get('noteZh'));
    },
    items: [{
        items: [{
            border: true,
            xtype: 'form',
            height: 100,
            layout: 'column',
            defaults: {
                xtype: 'displayfield',
                columnWidth: 0.5
            },
            bodyPadding: '5',
            items: [{
                fieldLabel: '图例编码',
                name: 'code'
            }, {
                fieldLabel: '图例名称',
                name: 'legendName'
            }, {
                fieldLabel: '图例标准名称编码',
                name: 'legendStandardCode'
            }, {
                fieldLabel: '图例标准名称',
                name: 'legendStandardName'
            }, {
                fieldLabel: '所属图例分组',
                name: 'groupName'
            }],
            margin: '0 0 10 0'
        }, {
            border: false,
            height: 430,
            layout: 'hbox',
            defaults: {
                width: '50%',
                height: '100%',
                border: true
            },
            items: [{
                itemId: 'legend-wrapper',
                margin: '0 10 0 0',
                items: [{
                    xtype: 'imagefield',
                    nopicPath: App.globalConfig.path + '/styles/images',
                    noImgFile: 'no_img.png',
                    viewBig: true,
                    value: ''
                }]
            }, {
                xtype: 'grid',
                cls: 'edit-grid',
                autoScroll: true,
                store: Ext.create('Ext.data.Store', {
                    field: [
                        'callout',
                        'supcfnaCode',
                        'legendCode',
                        'supcfnaNoteEn',
                        'supcfnaNoteZh'
                    ],
                    data: []
                }),
                columns: [{
                    text: '热点序号',
                    dataIndex: 'callout',
                    width: 100,
                    menuDisabled: true
                }, {
                    text: '售后FNA',
                    dataIndex: 'supcfnaCode',
                    flex: 1,
                    menuDisabled: true,
                    sortable: false,
                    renderer: function(data, metadata, record) {

                        return (data || '') + '&nbsp;&nbsp;' + (record.get('supcfnaNoteZh') || '');
                    }
                }, {
                    text: '操作',
                    align: 'center',
                    width: 130,
                    menuDisabled: true,
                    sortable: false,
                    renderer: function(data, metadata, record) {
                        var html = [];

                        html.push('<a href="javascript:void(0);" data-action="select"  class="btn-tb-link-small">选用</a>');
                        html.push('<a href="javascript:void(0);" data-action="find"  class="btn-tb-link-small">查找</a>');

                        return html.join('&nbsp;&nbsp;');
                    }
                }]
            }]
        }]
    }]
});