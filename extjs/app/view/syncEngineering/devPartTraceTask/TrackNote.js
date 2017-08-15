Ext.define('App.view.syncEngineering.devPartTraceTask.TrackNote', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '跟踪备注',
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
			url: App.globalConfig.path + '/develop-part-track-task/update-track-note',
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
			trackNote = form.findField('trackNote').getValue();

		return {
			partCode: partCode,
			trackNote: trackNote
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
			fieldLabel: '任务跟踪备注',
			name: 'trackNote',
			maxLength: 500
		}]
	}]
});