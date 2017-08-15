Ext.define('App.view.partEngineering.eco.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.ecoquery',
	items: [{
		items: [{
			fieldLabel: 'ECO编码',
			name: 'ecoCode'
		}, {
			fieldLabel: 'ECO描述',
			name: 'ecoDescription'
		}, {
			fieldLabel: 'ECR编码',
			name: 'ecrCode'
		}, {
			fieldLabel: 'ECR变更方案',
			name: 'ecrProposedChange'
		}, {
			fieldLabel: '变更原因',
			name: 'ecrReasonForChange'
		}]
	}]
});