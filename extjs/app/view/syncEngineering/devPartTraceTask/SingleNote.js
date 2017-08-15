Ext.define('App.view.syncEngineering.devPartTraceTask.SingleNote', {
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
			partCode = form.findField('partCode').getValue(),
			note = form.findField('note').getValue();

		return {
			updateCodes: [partCode],
			updateNote: note,
			updateStatus: 1
		};
	},

	items: [{
		defaults: {
			xtype: 'displayfield'
		},
		items: [{
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '中文名称',
			name: 'partNameZh'
		}, {
			fieldLabel: '英文名称',
			name: 'partNameEn'
		}, {
			allowBlank: false,
			xtype: 'textarea',
			fieldLabel: '任务完成备注',
			name: 'note'
		}]
	}]
});