Ext.define('App.view.syncEngineering.devPartTraceTask.BatchNote', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '完成备注',
	updateDisableItems: [],
	doSave: function() {
		if (!this.getForm().isValid()) {
			return;
		}
		var me = this,
			params = me.getParams();

		Ext.util.Common.ajax({
			method: 'PUT',
			jsonData: params,
			url: App.globalConfig.path + '/develop-part-track-task/update-task-status',
			beforerequest: function() {
				me.setLoading(true);
			},
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
			form = me.down("form").getForm(),
			note = form.findField('note').getValue();

		return {
			updateCodes: me.updateCodes,
			updateNote: note,
			updateStatus: 1
		};
	},

	items: [{
		defaults: {
			xtype: 'displayfield'
		},
		items: [{
			allowBlank: false,
			xtype: 'textarea',
			fieldLabel: '任务完成备注',
			name: 'note',
			maxLength: 500
		}]
	}]
});