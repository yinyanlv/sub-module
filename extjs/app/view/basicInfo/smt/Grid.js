Ext.define('App.view.basicInfo.smt.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.smtgrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: false,
	store: 'App.store.basicInfo.SMT',
	controlButtons: ['update', 'destroy'],
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/smt/export'
	}],
	columns: [{
		text: 'SMT编码',
		dataIndex: 'code',
		width: 150
	}, {
		text: 'SMT名称',
		dataIndex: 'name',
		width: 150
	}, {
		text: '创建人',
		dataIndex: 'createdBy',
		width: 120
	}, {
		text: '创建时间',
		dataIndex: 'createdDate',
		width: 140
	}, {
		text: '修改人',
		dataIndex: 'modifiedBy',
		width: 120
	}, {
		text: '修改时间',
		dataIndex: 'modifiedDate',
		width: 140
	}]
});