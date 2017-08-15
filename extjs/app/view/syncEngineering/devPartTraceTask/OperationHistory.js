Ext.define('App.view.syncEngineering.devPartTraceTask.OperationHistory', {
	extend: 'Ext.window.Window',
	closable: true,
	modal: true,
	resizable: false,
	constrainHeader: true,
	layout: "fit",
	closeAction: 'destroy',
	width: 680,
	height: 400,
	items: [{
		flex: 1,
		width: "100%",
		xtype: 'gridpanel',
		useArrows: true,
		rootVisible: false,
		store: Ext.create('Ext.data.Store'),
		columns: [{
			text: '操作时间',
			dataIndex: 'operateDate',
			width: 140,
			renderer: function(data, metadata, record) {
				return Ext.util.Format.localDate(data);
			}
		}, {
			text: '操作状态',
			dataIndex: 'taskStatusName',
			width: 80
		}, {
			text: '操作人',
			dataIndex: 'operateBy',
			width: 100
		}, {
			text: '操作备注',
			dataIndex: 'operateNote',
			flex: 1
		}]
	}],
	listeners: {
		afterrender: function() {
			this.bindData();
		}
	},

	bindData: function() {
		var me = this,
			data = me.record.get('operateHistories'),
			gridPanel = me.down('gridpanel');

		gridPanel.getStore().loadData(data);
	}
});