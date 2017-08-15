Ext.define('App.view.partEngineering.oldPartTask.AssignEdit', {
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
			url: App.globalConfig.path + '/old-part-task/update-ste',
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
			partCode = form.findField('oldPartCode').getValue(),
			steCode = form.findField('steCode').getValue(),
			steModifiedNote = form.findField('steModifiedNote').getValue();
			
		return {
			oldPartCode: partCode,
			steCode: steCode,
			steModifiedNote: steModifiedNote
		};
	},
	items: [{
		defaults: {
			xtype: 'displayfield'
		},
		items: [{
			fieldLabel: '配件编码',
			name: 'oldPartCode'
		}, {
			fieldLabel: '配件中文名称',
			name: 'oldPartNameZh'
		}, {
			fieldLabel: '配件英文名称',
			name: 'oldPartNameEn'
		}, {
			fieldLabel: 'SMT',
			name: 'smtName'
		}, {
			fieldLabel: '原STE',
			name: 'recommendSteName'
		}, {
			xtype: 'basecombo',
			fieldLabel: '新STE',
			name: 'steCode',
			allowBlank: false,
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'textarea',
			fieldLabel: '修改备注',
			name: 'steModifiedNote',
			allowBlank: false,
			maxLength: 500
		}]
	}]
});