Ext.define('App.view.partEngineering.electrophoresisEdit.BasicInfo', {
	extend: 'Ext.form.Panel',
	alias: 'widget.electrophoresiseditbasicinfo',
	style: 'background-color:#fff',
	layout: 'column',
	padding: '10 5 10 5',
	defaults: {
		xtype: 'textfield',
		margin: '0 50 5 0',
		readOnly: true
	},
	items: [{
		fieldLabel: '原始件编码',
		name: 'originalPartCode'
	}, {
		fieldLabel: '原始件中文名称',
		name: 'originalPartNameZh'
	}, {
		fieldLabel: '原始件英文名称',
		name: 'originalPartNameEn'
	}, {
		fieldLabel: '维修策略',
		name: 'servicePolicyName'
	}, {
		fieldLabel: '采购需求',
		name: 'purchaseDemandName'
	}, {
		fieldLabel: '采购状态',
		name: 'purchaseStatusName'
	}, {
		fieldLabel: '销售状态',
		name: 'salesStatusName'
	}]
});