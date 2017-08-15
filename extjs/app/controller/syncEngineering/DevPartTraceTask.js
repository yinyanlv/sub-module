Ext.define('App.controller.syncEngineering.DevPartTraceTask', {
	extend: 'Ext.ux.controller.CRUD',
	editView: 'App.view.syncEngineering.devPartTraceTask.AssignEdit',
	controllerReady: function() {
		var me = this;

		me.bindEvents();
	},

	bindEvents: function() {
		var me = this,
			grid = me.getGrid();

		grid.on('toolbarclick', function(that) {
			var action = that.action;

			switch (action) {
				case 'batch-complete':
					me.openBatchCompleteDialog();
					break;
				case 'assign-ste':
					me.openAssignSteDialog();
					break;
				case 'note':
					me.openTrackNoteDialog();
					break;
				default:
					break;
			}
		});

		grid.on('cellclick', function(view, cell, cellIndex, record, row, rowIndex, e) {
			if (e.getTarget('[data-action=complete]')) {
				me.openSingleCompleteDialog(record);
			}
			if (e.getTarget('[data-action=enable]')) {
				me.enableTask(record);
			}
			if (e.getTarget('[data-action=act]')) {
				me.openActDialog(record);
			}
			if (e.getTarget('[data-action=history]')) {
				me.openOperationHistoryDialog(record);
			}
		});
	},

	openBatchCompleteDialog: function(record) {
		var me = this,
			codes = me.getSelectionCodes(),
			className = 'App.view.syncEngineering.devPartTraceTask.BatchNote',
			dialog = Ext.create(className, {
				updateCodes: codes,
				autoShow: true
			});

		dialog.on('updatefinished', function() {
			me.readRecord();
		});
	},

	openSingleCompleteDialog: function(record) {
		var me = this,
			className = 'App.view.syncEngineering.devPartTraceTask.SingleNote',
			dialog = Ext.create(className, {
				autoShow: true
			});

		dialog.setRecord(record);

		dialog.on('updatefinished', function() {
			me.readRecord();
		});
	},

	openActDialog: function(record) {
		var me = this,
			partCode = record.get('partCode'),
			partNameZh = record.get('partNameZh'),
			partNameEn = record.get('partNameEn'),
			title = 'ACT信息 (' + partCode + '-' + partNameZh + '-' + partNameEn + ')',
			className = 'App.view.syncEngineering.devPartTraceTask.ActStructure',
			dialog = Ext.create(className, {
				title: title,
				autoShow: true,
				partCode: partCode
			});
	},

	openOperationHistoryDialog: function(record) {
		var me = this,
			className = 'App.view.syncEngineering.devPartTraceTask.OperationHistory',
			dialog = Ext.create(className, {
				title: '操作历史',
				autoShow: true,
				record: record
			});
	},

	openAssignSteDialog: function() {
		var me = this,
			record = me.getGridSelection()[0],
			className = 'App.view.syncEngineering.devPartTraceTask.AssignEdit',
			dialog = Ext.create(className, {
				autoShow: true
			});

		dialog.setRecord(record);

		dialog.on('updatefinished', function() {
			me.readRecord();
		});
	},

	openTrackNoteDialog: function() {
		var me = this,
			record = me.getGridSelection()[0],
			className = 'App.view.syncEngineering.devPartTraceTask.TrackNote',
			dialog = Ext.create(className, {
				autoShow: true
			});

		dialog.setRecord(record);

		dialog.on('updatefinished', function() {
			me.readRecord();
		});
	},

	enableTask: function(record) {
		var me = this;

		Ext.Msg.confirm('提示', '您确认要激活当前任务?', function(btn) {
			var params = {
				updateCodes: [record.get('partCode')],
				updateStatus: 0
			};
			if (btn === 'yes') {
				Ext.util.Common.ajax({
					method: 'PUT',
					jsonData: params,
					url: App.globalConfig.path + '/develop-part-track-task/update-task-status',
					success: function() {
						me.readRecord();
					}
				});
			}
		});
	},

	getSelectionCodes: function() {
		var me = this,
			codes = [],
			selections = me.getGridSelection();

		Ext.each(selections, function(record) {
			codes.push(record.get('partCode'));
		});

		return codes;
	}
});