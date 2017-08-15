Ext.define('App.view.partEngineering.servicePolicyChange.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '变更维修策略',
	itemId: 'edit',
	items: [{
		xtype: 'form',
		defaults: {
			xtype: "textfield",
			margin: '0 10 5 0',
			labelWidth: 120,
			labelPad: 10,
			flex: 1,
			allowBlank: false,
			labelAlign: 'left'
		},
		items: [{
			fieldLabel: '替换前配件编码',
			name: 'partCode',
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
				mapping: 'partCode'
			}, {
				name: 'nameZh',
				mapping: 'partNameZh'
			}, {
				name: 'nameEn',
				mapping: 'partNameEn'
			}, {
				name: 'servicePolicyCode',
				mapping: 'oldServicePolicyCode'
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
			xtype: 'displayfield',
			fieldLabel: '配件中文名称',
			name: 'partNameZh',
			allowBlank: true
		}, {
			xtype: 'displayfield',
			fieldLabel: '配件英文名称',
			name: 'partNameEn',
			allowBlank: true
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修策略-前',
			name: 'oldServicePolicyCode',
			storeAutoLoad: true,
			withAll: false,
			allowBlank: false,
			displayFormat:'{code}-{name}',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修策略-后',
			name: 'newServicePolicyCode',
			storeAutoLoad: true,
			withAll: false,
			allowBlank: false,
			url: App.globalConfig.path + '/combo/service-policy/list',
			listeners: {
				'change': function() {
					var me = this,
						form = me.up('form').getForm(),
						serviceSupportTypeCode = form.findField('serviceSupportTypeCode');
					if (me.getValue() === 'N') {
						serviceSupportTypeCode.allowBlank = false;
						serviceSupportTypeCode.blankText = '维修策略为“N-非维修件”，则必须选择维修支持类型！';
					} else {
						serviceSupportTypeCode.allowBlank = true;
					}
				}
			}
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修支持类型',
			name: 'serviceSupportTypeCode',
			storeAutoLoad: true,
			withAll: false,
			allowBlank: true,
			displayFormat: '{code}-{name}',
			url: App.globalConfig.path + '/combo/service-support-type/list',
			value: '',
			listeners: {
				'change': function() {
					var me = this,
						form = me.up('form').getForm(),
						serviceSupportTypeNote = form.findField('serviceSupportTypeNote');
					if (me.getValue() === 'PN') {
						serviceSupportTypeNote.allowBlank = false;
						serviceSupportTypeNote.maxLength = 50;
						serviceSupportTypeNote.blankText = '维修支持类型为“PN-零件号”，则Part/Note必须输入合法的零件号，最大长度为50个字符！'
					} else if (me.getValue() === 'NOTE') {
						serviceSupportTypeNote.allowBlank = false;
						serviceSupportTypeNote.maxLength = 500;
						serviceSupportTypeNote.blankText = '维修支持类型为“NOTE-备注”，则Part/Note不可为空，最大长度为500个字符！'
					} else {
						serviceSupportTypeNote.allowBlank = true;
					}


				}
			}
		}, {
			fieldLabel: 'part/note',
			name: 'serviceSupportTypeNote',
			maxLength: 200,
			allowBlank: true
		}, {
			xtype: 'basecombo',
			fieldLabel: '维修策略变更原因',
			name: 'changeReasonCode',
			storeAutoLoad: true,
			withAll: false,
			allowBlank: false,
			url: App.globalConfig.path + '/combo/sc-change-reason/list'
		}]
	}]
});