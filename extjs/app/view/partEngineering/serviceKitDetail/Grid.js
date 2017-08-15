Ext.define('App.view.partEngineering.serviceKitDetail.Grid', {
    extend: 'Ext.ux.component.grid.Grid',
    alias: 'widget.servicekitdetailgrid',
    multiSelectCheckbox: false,
    tbar: null,
    border: true,
    store: Ext.create('Ext.ux.store.Base', {
        proxyAPI: {
            read: App.globalConfig.path + '/service-kit/detail'
        },
        autoLoad: true,
        extraFilters: [{
            'name': 'kitCode',
            'value': App.pageConfig['kitCode']
        }]
    }),
    columns: [{
        text: '配件编码',
        dataIndex: 'partCode',
        width: 140
    }, {
        text: '配件中文名称',
        dataIndex: 'partNameZh',
        width: 160
    }, {
        text: '配件英文名称',
        dataIndex: 'partNameEn',
        width: 160
    }, {
        text: '配件备注(DRE)',
        dataIndex: 'partDescription',
        width: 160
    }, {
        text: '用量',
        dataIndex: 'qty',
        width: 100
    }, {
        text: '维修策略',
        dataIndex: 'servicePolicyName',
        width: 160
    }, {
        text: '用法状态',
        dataIndex: 'usageStatusName',
        width: 120
    }, {
        text: '采购需求',
        dataIndex: 'purchaseDemandName',
        width: 120
    }, {
        text: '采购状态',
        dataIndex: 'purchaseStatusName',
        width: 100
    }, {
        text: '销售状态',
        dataIndex: 'salesStatusName',
        width: 100
    }]
});