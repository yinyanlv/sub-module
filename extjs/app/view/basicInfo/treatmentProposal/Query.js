Ext.define('App.view.basicInfo.treatmentProposal.Query', {
	extend: 'Ext.ux.component.filter.Query',
	alias: 'widget.treatmentproposalquery',
	items: [{
		items: [{
			fieldLabel: '处理建议编码',
			name: 'code'
		}, {
			fieldLabel: '处理建议名称',
			name: 'name'
		}]
	}]
});