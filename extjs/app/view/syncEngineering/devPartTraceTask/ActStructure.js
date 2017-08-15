Ext.define('App.view.syncEngineering.devPartTraceTask.ActStructure', {
	extend: 'Ext.window.Window',
	closable: true,
	modal: true,
	resizable: false,
	constrainHeader: true,
	layout: "fit",
	closeAction: 'destroy',
	width: 750,
	height: 450,
	items: [{
		flex: 1,
		width: "100%",
		xtype: 'treepanel',
		useArrows: true,
		rootVisible: true,
		store: Ext.create('Ext.data.TreeStore', {
			autoLoad: false,
			proxy: {
				type: 'ajax',
				noCache: true,
				url: App.globalConfig.path + '/develop-part-track-task/get-act',
				reader: {
					type: 'json',
					rootProperty: ''
				}
			}
		}),
		columns: [{
			xtype: 'treecolumn',
			text: '子配件编码',
			locked: true,
			dataIndex: 'partCode',
			width: 170
		}, {
			text: '初始版本',
			dataIndex: 'partinitialVersion',
			width: 80
		}, {
			text: '当前版本',
			dataIndex: 'partCurrentVersion',
			width: 80
		}, {
			text: '配件中文名称',
			dataIndex: 'partNameZh',
			width: 120
		}, {
			text: '配件英文名称',
			dataIndex: 'partNameEn',
			width: 120
		}, {
			text: '设计阶段',
			dataIndex: 'designStageName',
			width: 100
		}, {
			text: 'SMT',
			dataIndex: 'smtName',
			width: 80
		}, {
			text: 'DRE',
			dataIndex: 'dreName',
			width: 80
		}, {
			text: '配件类型(PLM)',
			dataIndex: 'plmPartTypeName',
			width: 110
		}, {
			text: 'Partition Code',
			dataIndex: 'partitionCode',
			width: 140
		}, {
			text: 'FNA',
			dataIndex: 'fna',
			width: 80
		}]
	}],
	listeners: {
		afterrender: function() {
			this.load();
		}
	},
	load: function() {
		var me = this,
			treePanel = me.down('treepanel'),
			store = treePanel.getStore();

		store.load({
			params: {
				partCode: me.partCode
			},
			callback: function() {
				treePanel.expandAll();
			}
		});
	}
});