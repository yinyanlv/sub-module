Ext.define('App.view.partEngineering.partsDetail.PartsPurchase', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.partsdetailpartspurchase',
	title: '采购需求、销售、采购状态及相关属性',
	style: 'background-color:#fff',
	layout: 'column',
	defaults: {
		width: 200,
		labelWidth: 110,
		margin: '0 10 5 0',
		columnWidth: 0.16,
		readOnly: true,
		xtype: 'textfield'
	},
	items: [{
		fieldLabel: '采购需求',
		name: 'purchaseDemandName'
	}, {
		fieldLabel: '采购需求更新时间',
		name: 'purchaseDemandDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '采购状态',
		name: 'purchaseStatusName'
	}, {
		fieldLabel: '采购状态同步时间',
		name: 'purchaseStatusSyncDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '销售状态',
		name: 'salesStatusName'
	}, {
		fieldLabel: '销售状态同步时间',
		name: 'salesStatusSyncDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '供应商编码',
		name: 'supplierCode'
	}, {
		fieldLabel: '供应商名称',
		name: 'supplierName'
	}, {
		fieldLabel: '供应商联系方式',
		name: 'supplierTele'
	}, {
		fieldLabel: '供应商联系人',
		name: 'supplierContact'
	}, {
		fieldLabel: '采购工程师',
		name: 'purchaseEngineerName'
	}, {
		fieldLabel: '供应商配件编号',
		name: 'supplierPartCode'
	}, {
		fieldLabel: '配件有效期',
		name: 'validityPeriod'
	}]
});