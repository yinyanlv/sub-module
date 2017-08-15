Ext.define('App.view.partEngineering.partsDetail.PartsStock', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.partsdetailpartsstock',
	title: '库存、定价、包装状态',
	style: 'background-color:#fff',
	layout: 'column',
	defaults: {
		xtype: 'textfield',
		width: 200,
		labelWidth: 110,
		margin: '0 10 5 0',
		columnWidth: 0.16,
		readOnly: true
	},
	items: [{
		fieldLabel: '库存状态',
		name: 'stockStatusName'
	}, {
		fieldLabel: '库存状态同步时间',
		name: 'stockStatusSyncDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '定价状态',
		name: 'pricingStatusName'
	}, {
		fieldLabel: '定价状态同步时间',
		name: 'pricingStatusSyncDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '包装工程师',
		name: 'packageEngineerName'
	}, {
		fieldLabel: '最小包装单元',
		name: 'mpq'
	}, {
		fieldLabel: '重量(PLM)',
		name: 'plmWeight'
	}, {
		fieldLabel: '重量(SAP)',
		name: 'sapWeight'
	}, {
		fieldLabel: '长',
		name: 'length'
	}, {
		fieldLabel: '宽',
		name: 'width'
	}, {
		fieldLabel: '高',
		name: 'height'
	}, {
		fieldLabel: '单位',
		name: 'plmUnit'
	}, {
		fieldLabel: '材料',
		name: 'material'
	}, {
		fieldLabel: '规格',
		name: 'standard'
	}, {
		fieldLabel: '经销商最小订购量',
		name: 'dealerMoq'
	}, {
		fieldLabel: '供应商最小订购量',
		name: 'supplierMoq'
	}, {
		fieldLabel: '中间库最小订购量',
		name: 'middleWarehouseMoq'
	}, {
		fieldLabel: '包装材料编码',
		name: 'packageMaterialCode'
	}, {
		fieldLabel: '包装材料描述',
		name: 'packageMaterialDescription'
	}, {
		fieldLabel: '包装材料类型',
		name: 'packageMaterialType'
	}, {
		fieldLabel: '包装材料长',
		name: 'packageMaterialLength'
	}, {
		fieldLabel: '包装材料宽',
		name: 'packageMaterialWidth'
	}, {
		fieldLabel: '包装材料高',
		name: 'packageMaterialHeight'
	}, {
		fieldLabel: '是否紧急订单件',
		name: 'isRushOrderPartName'
	}]
});