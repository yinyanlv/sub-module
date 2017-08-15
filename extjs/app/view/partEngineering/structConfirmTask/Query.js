Ext.define('App.view.partEngineering.structConfirmTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.structconfirmtaskquery',
	items: [{
		items: [{
			fieldLabel: '父配件编码',
			name: 'parentPartCode'
		}, {
			fieldLabel: '父配件名称',
			name: 'parentPartName'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SPL',
			name: 'spl',
			value: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/user/list?type=SPL'
		}, {
			fieldLabel: '配件编码',
			name: 'partCode'
		}, {
			fieldLabel: '配件名称',
			name: 'partName'
		}, {
			xtype: 'basecombo',
			fieldLabel: '来源',
			name: 'source',
			value: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box-name-as-code/list?type=act_confirm_task_source'
		}, {
			xtype: 'basecombo',
			fieldLabel: '确认状态',
			name: 'isConfirm',
			value: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_confirm'
		}, {
			xtype: 'basecombo',
			fieldLabel: '确认结果',
			name: 'isAdopt',
			value: '',
			withAll: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_adopt'
		}]
	}]
});