Ext.define('App.view.basicInfo.fnaRelationship.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.fnarelationshipgrid',
    rownumberer: true,
    multiSelectCheckbox: false,
    fastOpenEditDialog: true,
    store: 'App.store.basicInfo.FnaRelationship',
    tbar: [{
        xtype: 'button',
        text: '导出',
        action: 'export',
        iconCls: 'iconfont icon-export',
        ui: 'grid-toolbar',
        exportUrl: App.globalConfig.path + '/pupcfna-maintaining-task/export'
    }],
    columns: [{
        text: '产品FNA',
        dataIndex: 'code',
        width: 140,
		locked: true
    }, {
        text: '操作',
        dataIndex: 'name',
        width: 100,
        align: 'center',
        locked: true,
        renderer: function(data, metadata, record) {

            return '<a href="javascript:void(0);" data-action="maintain"  class="btn-tb-link-small">维护</a>';
        }
    }, {
        text: '产品功能名称位置中文描述',
        dataIndex: 'noteZh',
        width: 180
    }, {
        text: '产品功能名称位置英文描述',
        dataIndex: 'noteEn',
        width: 180
    }, {
        text: '售后FNA',
        dataIndex: 'scode',
        width: 160
    }, {
        text: '售后功能名称位置中文描述',
        dataIndex: 'snoteZh',
        width: 180
    }, {
        text: '售后功能名称位置英文描述',
        dataIndex: 'snoteEn',
        width: 180
    }, {
        text: '任务状态',
        dataIndex: 'taskStatusName',
        width: 160
    }, {
        text: '任务创建日期',
        dataIndex: 'createdDate',
        width: 140
    }, {
        text: '任务结束日期',
        dataIndex: 'taskFinishDate',
        width: 140
    }]
});