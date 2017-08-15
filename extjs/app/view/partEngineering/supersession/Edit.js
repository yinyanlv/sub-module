Ext.define('App.view.partEngineering.supersession.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '替换管理',
	updateDisableItems: ['oldCode'],
	updateDisplayItems: ['deletedCode', 'holder'],
	createNoSubmitFields: ['deletedCode'],
	width: 640,
	itemId: 'edit',
	setRecord: function(params) {
		var me = this,
			formPanel = me.down("form"),
			treatmentProposalCode = formPanel.getForm().findField('treatmentProposalCode');

		formPanel.loadRecord(params);

		if (me.editMode === 'update') {
			setTimeout(function() {
				treatmentProposalCode.setValue(params.get('treatmentProposalCode') || '');
			}, 300);
		}
	},
	items: [{
		xtype: 'form',
		layout: {
			type: 'vbox'
		},
		defaults: {
			width: '100%',
			layout: {
				type: 'hbox'
			},
			border: false,
			defaults: {
				xtype: "textfield",
				margin: '0 10 5 0',
				labelWidth: 120,
				labelPad: 10,
				flex: 1,
				allowBlank: false,
				labelAlign: 'left'
			}
		},
		items: [{
			items: [{
				xtype: 'hidden',
				name: 'id'
			}, {
				fieldLabel: '替换前配件编码',
				name: 'oldCode',
				allowBlank: false,
				xtype: 'selectorfield',
				editable: false,
				windowTitle: '选择配件',
				searchInputConfig: {
					flex: 1,
					labelPad: 10,
					labelWidth: 100,
					fieldLabel: '配件编码或名称',
					toUppercase: true
				},
				readUrl: App.globalConfig.path + '/part/basic-info-page',
				fields: [{
					name: 'code',
					mapping: 'oldCode'
				}, {
					name: 'nameZh',
					mapping: 'oldNameZh'
				}, {
					name: 'nameEn',
					mapping: 'oldNameEn'
				}],
				paramFields: ['codeOrName'],
				columns: [{
					text: "序号",
					xtype: 'rownumberer',
					align: 'center',
					width: 60
				}, {
					text: '配件编码',
					dataIndex: 'code',
					flex: 1
				}, {
					text: '配件中文名称',
					dataIndex: 'nameZh',
					flex: 1
				}, {
					text: '配件英文名称',
					dataIndex: 'nameEn',
					flex: 1
				}]
			}, {
				fieldLabel: '替换后配件编码',
				name: 'newCode',
				allowBlank: false,
				xtype: 'selectorfield',
				editable: false,
				windowTitle: '选择配件',
				searchInputConfig: {
					flex: 1,
					labelPad: 10,
					labelWidth: 100,
					fieldLabel: '配件编码或名称',
					toUppercase: true
				},
				readUrl: App.globalConfig.path + '/part/basic-info-page',
				fields: [{
					name: 'code',
					mapping: 'newCode'
				}, {
					name: 'nameZh',
					mapping: 'newNameZh'
				}, {
					name: 'nameEn',
					mapping: 'newNameEn'
				}],
				paramFields: ['codeOrName'],
				columns: [{
					text: "序号",
					xtype: 'rownumberer',
					align: 'center',
					width: 60
				}, {
					text: '配件编码',
					dataIndex: 'code',
					flex: 1
				}, {
					text: '配件中文名称',
					dataIndex: 'nameZh',
					flex: 1
				}, {
					text: '配件英文名称',
					dataIndex: 'nameEn',
					flex: 1
				}]
			}]
		}, {
			items: [{
				xtype: 'displayfield',
				fieldLabel: '替换前配件中文名称',
				allowBlank: true,
				name: 'oldNameZh'
			}, {
				xtype: 'displayfield',
				fieldLabel: '替换后配件中文名称',
				allowBlank: true,
				name: 'newNameZh'
			}]
		}, {
			items: [{
				xtype: 'displayfield',
				fieldLabel: '替换前配件英文名称',
				allowBlank: true,
				name: 'oldNameEn'
			}, {
				xtype: 'displayfield',
				fieldLabel: '替换后配件英文名称',
				allowBlank: true,
				name: 'newNameEn'
			}]
		}, {
			items: [{
				allowBlank: false,
				xtype: 'basecombo',
				fieldLabel: '替换类型',
				name: 'typeCode',
				storeAutoLoad: true,
				withAll: false,
				displayFormat:'{code}-{name}',
				url: App.globalConfig.path + '/combo/supersession-type/list',
				listeners: {
					'change': function(that, newValue, oldValue, eOpts) {
						var me = this,
							form = me.up("form").getForm(),
							treatmentProposalCode = form.findField("treatmentProposalCode");

						if (newValue === 'NN') {
							treatmentProposalCode.setDisabled(true);
							treatmentProposalCode.allowBlank = true;
						} else {
							treatmentProposalCode.setDisabled(false);
							treatmentProposalCode.allowBlank = false;
						}
						treatmentProposalCode.setValue('');
					}
				}
			}, {
				xtype: 'basecombo',
				fieldLabel: '处理建议',
				name: 'treatmentProposalCode',
				storeAutoLoad: true,
				withAll: false,
				allowBlank: false,
				displayFormat:'{code}-{name}',
				url: App.globalConfig.path + '/combo/treatment-proposal/list',
				listeners: {
					'expand': function(combobox) {
						var me = this,
							reg,
							form = me.up("form").getForm(),
							typeCode = form.findField("typeCode").getValue();

						switch (typeCode) {
							case 'YY':
								reg = /^ASAP$/;
								break;
							case 'YN':
								reg = /^(VERSION)|(ASAP)$/;
								break;
							case 'DISP':
							case 'REWK':
								reg = /^(ASAP)|(URGENT)$/;
								break;
							default:
								break;
						}

						combobox.getStore().filter([{
							property: 'code',
							value: reg
						}]);
					}
				}
			}]
		}, {
			items: [{
				xtype: 'datefield',
				fieldLabel: '预估断点时间',
				name: 'forecastBreakPointDate',
				format: 'Y-m-d',
				allowBlank: true
			}, {
				xtype: 'datefield',
				fieldLabel: '断点时间',
				name: 'breakPointDate',
				format: 'Y-m-d',
				allowBlank: true
			}]
		}, {
			items: [{
				xtype: 'textarea',
				fieldLabel: '替换备注',
				maxLength: 500,
				name: 'note',
				allowBlank: true
			}, {
				xtype: 'textarea',
				fieldLabel: '断点信息（by vin）',
				maxLength: 500,
				name: 'breakPointInfoByVin',
				allowBlank: true
			}]
		}, {
			items: [{
				xtype: 'basecombo',
				fieldLabel: '删除标识',
				name: 'deletedCode',
				storeAutoLoad: true,
				withAll: false,
				allowBlank: true,
				hidden: true,
				url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=deleted',
				value: ''
			}, {
				xtype: 'displayfield',
				name: 'holder',
				isNotSubmit: true,
				hidden: true,
				value: ''
			}]
		}]
	}]
});