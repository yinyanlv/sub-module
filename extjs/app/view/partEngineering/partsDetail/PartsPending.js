Ext.define('App.view.partEngineering.partsDetail.PartsPending', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.partsdetailpartspending',
	title: '配件判断相关属性',
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
		fieldLabel: '维修策略',
		name: 'servicePolicyName'
	}, {
		fieldLabel: '维修支持类型',
		name: 'serviceSupportTypeName'
	}, {
		fieldLabel: '支持类型备注(note)',
		name: 'serviceSupportTypeNote'
	}, {
		xtype: 'basecombo',
		fieldLabel: '维修件类型',
		name: 'servicePartTypeCode',
		readOnly: false,
		url: App.globalConfig.path + '/combo/service-part-type/list',
		listeners: {
			change: function() {
				var store = this.getStore(),
					form = this.up('form').getForm(),
					cbGeneratePartColorCodes = form.findField('generatePartColorCodes'),
					servicePartTypeCode = form.findField('servicePartTypeCode').getValue();

				if (servicePartTypeCode !== 'CP') {
					cbGeneratePartColorCodes.setValue('');
				}
			}
		}
	}, {
		xtype: 'basecombo',
		fieldLabel: '生成颜色:',
		name: 'generatePartColorCodes',
		readOnly: false,
		multiSelect: true,
		url: App.globalConfig.path + '/combo/part-color/list',
		listeners: {
			expand: function() {
				var store = this.getStore(),
					form = this.up('form').getForm(),
					servicePartTypeCode = form.findField('servicePartTypeCode').getValue();

				if (servicePartTypeCode !== 'CP') {
					store.filter(function(rec) {
						return false;
					});
					Ext.Msg.alert('提示', '当前维修件类型非“颜色件”, 不可编辑');
				} else {
					store.clearFilter();
				}
			}
		}
	}, {
		fieldLabel: '设计颜色',
		name: 'plmGeneratedColorNames'
	}, {
		fieldLabel: '颜色',
		name: 'colorName'
	}, {
		fieldLabel: 'STE',
		name: 'steName'
	}, {
		fieldLabel: '维修策略判定时间',
		name: 'servicePolicyDetermineDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '是否标识过维修件',
		name: 'wasServicePart'
	}, {
		fieldLabel: '替换类型',
		name: 'supersessionTypeName'
	}, {
		fieldLabel: '处理建议',
		name: 'treatmentProposalName'
	}, {
		fieldLabel: '替换后配件编码',
		name: 'newPartCode'
	}, {
		fieldLabel: '替换配件中文名称',
		name: 'newPartNameZh'
	}, {
		fieldLabel: '替换配件英文名称',
		name: 'newPartNameEn'
	}, {
		fieldLabel: '预估断点时间',
		name: 'forecastBreakPointDate',
		setValue: function(v) {
			this.setRawValue(Ext.util.Format.localDate(v));
		}
	}, {
		fieldLabel: '替换备注',
		name: 'supersessionNote'
	}]
});