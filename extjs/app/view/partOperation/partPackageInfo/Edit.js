Ext.define('App.view.partOperation.partPackageInfo.Edit', {
	extend: 'Ext.ux.component.edit.Edit',
	title: '配件包装信息维护',
	width: 640,
	itemId: 'edit',
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
				allowBlank: true,
				labelAlign: 'left'
			}
		},
		items: [{
			items: [{
				fieldLabel: '配件编码',
				disabled: true,
				name: 'code'
			}, {
				fieldLabel: '配件中文名称',
				disabled: true,
				name: 'nameZh'
			}]
		}, {
			items: [{
				fieldLabel: '配件英文名称',
				disabled: true,
				name: 'nameEn'
			}, {
				fieldLabel: '销售状态',
				disabled: true,
				name: 'salesStatusName'
			}]
		}, {
			items: [{
				xtype: 'basecombo',
				fieldLabel: '包装工程师',
				name: 'packageEngineerCode',
				storeAutoLoad: true,
				withAll: false,
				url: App.globalConfig.path + '/combo/user/list?type=PKG'
			}, {
				name: 'length',
				fieldLabel: '长'
			}]
		}, {
			items: [{
				name: 'width',
				fieldLabel: '宽'
			}, {
				name: 'height',
				fieldLabel: '高'
			}]
		}, {
			items: [{
				xtype: 'numberfield',
				name: 'supplierMoq',
				fieldLabel: '供应商最小订购量',
				minValue: 1
			}, {
				xtype: 'numberfield',
				name: 'middleWarehouseMoq',
				fieldLabel: '中间库最小订购量',
				minValue: 1
			}]
		}, {
			items: [{
				xtype: 'numberfield',
				name: 'dealerMoq',
				fieldLabel: '经销商最小订购量',
				minValue: 1
			}, {
				fieldLabel: '包装材料编码',
				name: 'packageMaterialCode',
				xtype: 'selectorfield',
				editable: false,
				windowTitle: '选择包装材料',
				searchInputConfig: {
					flex: 1,
					labelPad: 10,
					labelWidth: 120,
					fieldLabel: '包装材料编码或描述',
					toUppercase: true
				},
				readUrl: App.globalConfig.path + '/package-material/page',
				fields: [{
					name: 'code',
					mapping: 'packageMaterialCode'
				}, {
					name: 'description',
					mapping: 'packageMaterialDescription'
				}, {
					name: 'length',
					mapping: 'packageMaterialLength'
				}, {
					name: 'width',
					mapping: 'packageMaterialWidth'
				}, {
					name: 'height',
					mapping: 'packageMaterialHeight'
				}, {
					name: 'type',
					mapping: 'packageMaterialType'
				}],
				paramFields: ['codeOrName'],
				columns: [{
					text: "序号",
					xtype: 'rownumberer',
					align: 'center',
					width: 60
				}, {
					text: '包装材料编码',
					dataIndex: 'code',
					flex: 1
				}, {
					text: '包装材料描述',
					dataIndex: 'description',
					flex: 1
				}, {
					text: '包装材料类型',
					dataIndex: 'type',
					flex: 1
				}]
			}]
		}, {
			items: [{
				fieldLabel: '包装材料描述',
				disabled: true,
				name: 'packageMaterialDescription'
			}, {
				fieldLabel: '包装材料长',
				disabled: true,
				name: 'packageMaterialLength'
			}]
		}, {
			items: [{
				fieldLabel: '包装材料宽',
				disabled: true,
				name: 'packageMaterialWidth'
			}, {
				fieldLabel: '包装材料高',
				disabled: true,
				name: 'packageMaterialHeight'
			}]
		}, {
			items: [{
				fieldLabel: '包装材料类型',
				disabled: true,
				name: 'packageMaterialType'
			}, {
				xtype: 'basecombo',
				fieldLabel: '是否紧急订单件',
				name: 'isRushOrderPartCode',
				storeAutoLoad: true,
				withAll: true,
				url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_rush_order_part'
			}]
		}, {
			items: [{
				fieldLabel: '包装规范编码',
				name: 'packageStandardCode',
				xtype: 'selectorfield',
				editable: false,
				windowTitle: '选择包装规范',
				searchInputConfig: {
					flex: 1,
					labelPad: 10,
					labelWidth: 80,
					fieldLabel: '包装规范编码',
					toUppercase: true
				},
				readUrl: App.globalConfig.path + '/package-standard/page',
				fields: [{
					name: 'code',
					mapping: 'packageStandardCode'
				}, {
					name: 'name',
					mapping: 'packageStandardName'
				}, {
					name: 'photoOriginalFilename',
					mapping: 'packageStandardPhotoOriginalFilename'
				}, {
					name: 'photoUltimatelyFilename',
					mapping: 'packageStandardPhotoUltimatelyFilename'
				}],
				paramFields: ['code'],
				columns: [{
					text: "序号",
					xtype: 'rownumberer',
					align: 'center',
					width: 60
				}, {
					text: '包装规范编码',
					dataIndex: 'code',
					flex: 1
				}, {
					text: '包装规范描述',
					dataIndex: 'name',
					flex: 1
				}, {
					text: '包装规范示意图',
					dataIndex: 'photoOriginalFilename',
					flex: 1
				}],
				listeners: {
					selectionchange: function(selector) {
						var me = this,
							form = this.up('form'),
							originalFilename = form.down('[itemId=originalFilename]');

						setTimeout(function() {
							originalFilename.setValue(originalFilename.getValue() || '');
						}, 10);
					}
				}
			}, {
				xtype: 'hidden',
				itemId: 'ultimatelyFilename',
				name: 'packageStandardPhotoUltimatelyFilename'
			}, {
				fieldLabel: '包装规范示意图',
				xtype: 'displayfield',
				itemId: 'originalFilename',
				name: 'packageStandardPhotoOriginalFilename',
				renderer: function(val) {
					var me = this,
						ultimatelyFilename = me.up('[itemId=edit]').down('[itemId=ultimatelyFilename]').getValue();

					if (!val) {
						return '';
					} else {
						return '<a href="' + App.globalConfig.packageImgResPrefix + ultimatelyFilename + '" target="_blank">' + val + '</a>';
					}
				}
			}]
		}]
	}]
});