Ext.define('App.view.syncEngineering.devPartTraceTask.AssignEdit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '强制修改STE',
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
			url: App.globalConfig.path + '/develop-part-track-task/update-ste',
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
			newSteCode = form.findField('newSteCode').getValue(),
			note = form.findField('modifySteNote').getValue();

		return {
			partCode: partCode,
			newSteCode: newSteCode,
			modifySteNote: note
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
			fieldLabel: '配件中文名称',
			name: 'partNameZh'
		}, {
			fieldLabel: '配件英文名称',
			name: 'partNameEn'
		}, {
			fieldLabel: 'SMT',
			name: 'smtName'
		}, {
			fieldLabel: '原STE',
			name: 'oldSteName'
		}, {
			xtype: 'basecombo',
			fieldLabel: '新STE',
			name: 'newSteCode',
			allowBlank: false,
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'textarea',
			fieldLabel: '修改备注',
			name: 'modifySteNote',
			maxLength: 500
		}]
	}]
});