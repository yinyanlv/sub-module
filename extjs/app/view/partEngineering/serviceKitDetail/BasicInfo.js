Ext.define('App.view.partEngineering.serviceKitDetail.BasicInfo', {
	extend: 'Ext.form.Panel',
	alias: 'widget.servicekitdetailbasicinfo',
	style: 'background-color:#fff',
	layout: 'column',
	padding: '10 5 10 5',
	defaults: {
		xtype: 'textfield',
		margin: '0 50 5 0',
		readOnly: true
	},
	items: [{
		fieldLabel: '维修包编码',
		name: 'code'
	}, {
		fieldLabel: '维修包名称',
		name: 'nameZh'
	}, {
		fieldLabel: '维修包备注',
		name: 'note'
	}, {
		fieldLabel: '父配件编码',
		name: 'parentPartCodes'
	}, {
		fieldLabel: '父配件名称',
		name: 'parentPartNameZhs'
	}]
});