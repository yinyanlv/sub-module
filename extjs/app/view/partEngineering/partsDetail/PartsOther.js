Ext.define('App.view.partEngineering.partsDetail.PartsOther', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.partsdetailpartsother',
	title: '其他',
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
		fieldLabel: '创建人',
		name: 'createdBy'
	}, {
		fieldLabel: '创建时间:',
		name: 'createdDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '修改人',
		name: 'modifiedBy'
	}, {
		fieldLabel: '修改时间',
		name: 'modifiedDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}]
});