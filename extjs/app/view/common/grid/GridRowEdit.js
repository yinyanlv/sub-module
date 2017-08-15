Ext.define('App.view.common.grid.GridRowEdit', {
    extend: 'Ext.ux.component.grid.Grid',
    flex: 1,
    multiSelectCheckbox: true,
    multiCellSelectCheckbox: true,
    header: null,
    title: null,
    destroyKeys: ['Id'],
    tbar: [{
        iconCls: 'x-fa fa-plus-square-o',
        tooltip: '添加',
        text: '添加',
        action: 'create',
        ui: 'grid-toolbar',
        handler: function () {
            var grid = this.up('grid'),
                store = grid.getStore(),
                rowEditing = grid.plugins[0],
                count = store.getRange().length;

            if (rowEditing.editing) {
                return;
            }

            rowEditing.cancelEdit();
            store.insert(count, {});
            rowEditing.startEdit(count, 0);
        }
    }, {
        iconCls: 'x-fa fa-trash-o',
        text: '删除',
        tooltip: '删除',
        action: 'destroy',
        disabled: true,
        singleSelectEnable: false,
        ui: 'grid-toolbar'
    }],

    bbar: [{
        xtype: 'displayfield',
        value: '提示： 双击行可进行编辑',
        fieldStyle: 'color: red;'
    }],

    constructor: function (config) {
        var me = this;
 
        me.params = config;
        me.columns = me.getColumns();
        me.plugins = me.getRowEditPlugin();
        
        this.callParent(arguments);
    },

    initEvents: function () {
        var me = this;

        me.load();

        this.callParent(arguments);
    },

    plugins: [],

    store: Ext.create('Ext.data.Store', {
        fields: ['Id', 'Name', 'UpdateNotes', 'Enable']
    }),

    getColumns: function () {
        var me = this;

        return [{
            text: '序号',
            xtype: 'rownumberer',
            width: 60,
            align: 'center'
        }, {
            text: me.params.typeTitle || '类型',
            width: 150,
            dataIndex: 'Name',
            sortable: false,
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: "修改原因备注",
            dataIndex: 'UpdateNotes',
            sortable: false,
            width: 230,
            editor: {
                xtype: 'textfield'
            }
        }, {
            text: "状态",
            flex: 1,
            dataIndex: 'Enable',
            sortable: false,
            align: 'center',
            width: 90,
            renderer: function (val) {
                return val ? '启用' : '禁用';
            },
            editor: {
                xtype: 'basecombo',
                withAll: false,
                value: true,
                localData: [{
                    code: true,
                    name: '启用'
                }, {
                    code: false,
                    name: '禁用'
                }]
            }
        }];

    },

    getRowEditPlugin: function () {
        var me = this;

        return [Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            saveBtnText: '保存',
            cancelBtnText: '取消',
            autoCancel: false,
            errorSummary: false,
            listeners: {
                canceledit: function (editor, e) {
                    var Name = e.record && e.record.get('Name');

                    if (!Name) {
                        e.store.remove(e.record);
                    }
                },
                edit: function (editor, e) {
                    var grid = editor.grid;

                    grid.doSave(e.record && e.record.data);
                }
            }
        })];
    },

    load: function () {
        var me = this;

        Ext.util.Common.ajax({
            url: me.params.loadUrl + '?args={"filters":[],"sorts":[],"paging":{"page":1,"size":20}}',
            disableCaching: true,
            method: 'GET',
            beforerequest: function () {
                me.setLoading(true);
            },
            callback: function () {
                me.setLoading(false);
            },
            success: function (rst) {

                me.store.removeAll();
                me.store.loadData(rst.list || []);
            }
        });
    },

    doSave: function(params) {
        var me = this;

        if (params.id) {
            delete params.id;
        }

        Ext.util.Common.ajax({
            url: me.params.saveUrl,
            method: 'POST',
            jsonData: params,
            beforerequest: function () {
                me.setLoading(true);
            },
            callback: function () {
                me.setLoading(false);
            },
            success: function (rst) {

                me.load();
            }
        });
    },

    destroyRecord: function (that) {
        var me = this,
            rowEditing = me.plugins[0];

        if (rowEditing.editing) {
         
            return;
        }

        Ext.Msg.confirm("提示", "确认删除被选中记录?", function (btn) {
            if (btn === "yes") {
                var params = me.getDestroyParams();

                if (params.length > 0) {

                    Ext.util.Common.ajax({
                        url: me.params.deleteUrl,
                        method: 'DELETE',
                        jsonData: params,
                        beforerequest: function () {
                            me.setLoading(true);
                        },
                        callback: function () {
                            me.setLoading(false);
                        },
                        success: function (rst) {
                            
                            me.load();
                        }
                    });
                } else {

                    me.load();
                }
            }
        });
    },


    getDestroyParams: function () {
        var me = this,
			params = [],
			selection = me.getGridSelection();

        Ext.each(selection, function (record) {
            var item = {};

            Ext.each(me.destroyKeys, function (key) {
                var val = record.get(key);

                item[key] = typeof val == 'undefined' ? "" : val;
            });

            if (item.Id) {

                params.push(item);
            }
        });

        return params;
    },

    columns: []
});