Ext.define('App.view.generalSettings.taskRuleManagement.Viewport', {
	extend: 'Ext.ux.component.viewport.Base',
	requires: [
		'App.view.generalSettings.taskRuleManagement.Query',
		'App.view.generalSettings.taskRuleManagement.Grid',
		'App.view.generalSettings.taskRuleManagement.Edit'
	],

	items: [{
		region: 'north',
		xtype: 'taskrulemanagementquery',
		overflowX: 'auto',
		width: '100%',
		minHeight: 70,
		split: true
	}, {
		region: 'center',
		xtype: 'taskrulemanagementgrid'
	}]
});