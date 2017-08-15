Ext.define('App.view.basicInfo.rpo.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.rpogrid',
	rownumberer: true,
	multiSelectCheckbox: true,
	fastOpenEditDialog: true,
	store: 'App.store.basicInfo.RPO',
	tbar: [{
		xtype: 'button',
		text: '导出',
		action: 'export',
		iconCls: 'iconfont icon-export',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/option/export'
	}],
	columns: [{
		text: 'OptionCode',
		dataIndex: 'code',
		width: 100
	}, {
		text: '配置中文描述',
		dataIndex: 'noteZh',
		width: 140
	}, {
		text: '配置英文描述',
		dataIndex: 'noteEn',
		width: 140
	}, {
		text: 'FamilyCode',
		dataIndex: 'familyCode',
		width: 100
	}, {
		text: 'Family中文描述',
		dataIndex: 'familyNoteZh',
		width: 140
	}, {
		text: 'Family英文描述',
		dataIndex: 'familyNoteEn',
		width: 140
	}]
});