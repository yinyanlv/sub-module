Ext.define('App.view.partEngineering.oldPartTask.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.oldparttaskquery',
	items: [{
		items: [{
			fieldLabel: '旧件编码',
			name: 'oldPartCode'
		}, {
			fieldLabel: '配件名称',
			name: 'oldPartName'
		}, {
			xtype: 'basecombo',
			fieldLabel: 'SMT',
			name: 'smtCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/smt/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '当前STE',
			name: 'steCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/user/list?type=STE'
		}, {
			xtype: 'basecombo',
			fieldLabel: '来源',
			name: 'source',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/source/list'
		}, {
			fieldLabel: 'ECR编码',
			name: 'ecrCode'
		}, {
			xtype: 'basecombo',
			fieldLabel: '替换类型',
			name: 'supersessionTypeCode',
			withAll: true,
			value: '',
			displayFormat:'{code}-{name}',
			url: App.globalConfig.path + '/combo/supersession-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '处理建议',
			name: 'treatmentProposalCode',
			withAll: true,
			value: '',
			displayFormat:'{code}-{name}',
			url: App.globalConfig.path + '/combo/treatment-proposal/list'
		}, {
			fieldLabel: '替换后配件编码',
			name: 'newPartCode'
		}, {
			fieldLabel: '替换后配件名称',
			name: 'newPartName'
		}, {
			xtype: 'basecombo',
			fieldLabel: '旧件维修策略',
			name: 'oldServicePolicyCode',
			withAll: true,
			value: '',
			displayFormat:'{code}-{name}',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '旧件维修件类型',
			name: 'oldServicePartTypeCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/service-part-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '旧件维修支持类型',
			name: 'serviceSupportTypeCode',
			withAll: true,
			displayFormat: '{code}-{name}',
			value: '',
			url: App.globalConfig.path + '/combo/service-support-type/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '任务状态',
			name: 'taskStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=task_status'
		}, {
			xtype: 'datefield',
			fieldLabel: '开始日期-起',
			name: 'startDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '开始日期-止',
			name: 'startDate_E',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '结束日期-起',
			name: 'endDate_S',
			format: 'Y-m-d'
		}, {
			xtype: 'datefield',
			fieldLabel: '结束日期-止',
			name: 'endDate_E',
			format: 'Y-m-d'
		}]
	}]
});