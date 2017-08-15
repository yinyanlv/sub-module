Ext.define('App.controller.partEngineering.OldPartTask', {
	extend: 'Ext.ux.controller.CRUD',
	editView: 'App.view.partEngineering.oldPartTask.AssignEdit',
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
				case 'assign-ste':
					me.openAssignSteDialog();
					break;
				default:
					break;
			}
		});
	},


	openAssignSteDialog: function() {
		var me = this,
			record = me.getGridSelection()[0],
			className = 'App.view.partEngineering.oldPartTask.AssignEdit',
			dialog = Ext.create(className, {
				autoShow: true
			});

		dialog.setRecord(record);

		dialog.on('updatefinished', function() {
			me.readRecord();
		});
	}
});