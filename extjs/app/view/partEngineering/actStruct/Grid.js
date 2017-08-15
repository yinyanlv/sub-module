Ext.define('App.view.partEngineering.actStruct.Grid', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.actstructgrid',
	ui: 'grid',
	flex: 1,
	header: {
		style: 'border:1px solid #EAEDF1 !important;'
	},
	title: '<span class="vertical-line">列表区域</span>',
	selModel: {
		selType: 'checkboxmodel',
		injectCheckbox: 0
	},
	useArrows: true,
	rootVisible: false,
	viewConfig: {
		enableTextSelection: true
	},
	cls: 'edit-grid',
	plugins: (function() {
		var plugin = [Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})];

		return plugin;
	})(),
	store: Ext.create('App.store.partEngineering.ActStruct'),
	initEvents: function() {
		var me = this,
			btnSave = me.down('[itemId=save]'),
			btnExport = me.down('[itemId=export]'),
			btnImportStruct = me.down('[itemId=import-struct]'),
			btnImportUsageStatus = me.down('[itemId=import-usage-status]'),
			btnUpdateUpcFna = me.down('[itemId=update-productionupcfna]');

		me.on({
			beforeedit: function(editor, e) {
				var isEdit = true;

				if (e.field === 'productUpcfnaCode') {
					isEdit = e.record.get('toBeConfirmed');
				} else {
					isEdit = !e.record.get('aftersalesPart');
				}
				if (e.field === 'isInheritanceStructureCode') {
					isEdit = e.record.get('toBeConfirmed');
				}
				if (e.field === 'qty' && e.record.get('source') == 'EBOM') {
					isEdit = false;
				}
				if (e.record.get('level') == 1) {
					isEdit = false;
				}
				if (isEdit) {
					me.expandCombobox(e);
				}

				return isEdit;
			},
			validateedit: function(editor, e) {
				me.setComboboxCellText(editor, e);

				return true;
			},
			cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
				if (e.getTarget('[data-action=delete]')) {
					me.doDelete(record);
				}
				if (e.getTarget('[data-action=trigger]')) {
					me.activeRecord = e.record;
					me.openUpcFnaSelectDialog(record);
				}
			},
			selectionchange: function(that, selected, eOpts) {

				me.controlToolbarStatus(that, selected, eOpts);
			}
		});

		btnSave.on('click', function() {
			me.doSave();
		});

		btnExport.on('click', function() {
			me.fireEvent('export');
		});

		btnImportStruct.on('click', function() {
			me.doImportStruct();
		});

		btnImportUsageStatus.on('click', function() {
			me.doImportUsageStatus();
		});

		btnUpdateUpcFna.on('click', function() {
			me.fireEvent('updateupcfna');
		});
	},

	controlEdit: function(e) {
		var me = this,
			status = e.record.get('status');

		return status === 1;
	},

	controlToolbarStatus: function(that, selected, eOpts) {
		var me = this,
			isDisabled = false,
			aftersalesPart, toBeconfirmed, isManualCode,
			btnUpdateUpcFna = me.down('[itemId=update-productionupcfna]');

		if (selected.length > 0) {
			aftersalesPart = selected[0].get('aftersalesPart');
			toBeconfirmed = selected[0].get('toBeConfirmed');

			if (aftersalesPart || toBeconfirmed) {
				isDisabled = true;
			}
		}
		if (selected.length == 1) {
			btnUpdateUpcFna.setDisabled(isDisabled);
		} else {
			btnUpdateUpcFna.setDisabled(true);
		}
	},

	expandCombobox: function(e) {
		var me = this,
			combobox = me.columns[e.colIdx - 1].getEditor(e.record);

		if (combobox.xtype === 'basecombo') {
			window.setTimeout(function() {
				combobox.onTriggerClick();
			}, 200)
		}
	},

	setComboboxCellText: function(editor, e) {
		var me = this,
			editor = e.column.getEditor(),
			text = editor.getRawValue(),
			value = editor.getValue(),
			codeMapping = {
				'deletedCode': 'deletedName',
				'usageStatusCode': 'usageStatusName',
				'isInheritanceStructureCode': 'isInheritanceStructureName'
			},
			name = codeMapping[e.field];

		if (name) {
			e.record.set(name, text);
		}
	},

	doSave: function() {
		var me = this,
			params = me.getSaveParams();

		if (params.length === 0) {
			Ext.Msg.alert('提示', '未做修改，无需保存');
			return;
		}

		if (!me.validateSave()) {
			Ext.Msg.alert('提示', '列表填写有误，请查检查列表错误信息');
			return;
		}

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/act/update',
			method: 'PUT',
			jsonData: params,
			beforerequest: function() {
				me.setLoading('提示', '保存中...');
			},
			callback: function() {
				me.setLoading(false);
			},
			success: function() {
				me.fireEvent('reload');
				Ext.Msg.alert('提示', '保存成功');
			}
		});
	},

	doDelete: function(record) {
		var me = this,
			params = me.getDeleteParams(record);

		Ext.Msg.confirm('提示', '您确认要删除当前删除？', function(btn) {
			if (btn === 'yes') {
				Ext.util.Common.ajax({
					url: App.globalConfig.path + '/act/delete',
					method: 'post',
					jsonData: params,
					beforerequest: function() {
						me.setLoading('提示', '删除中...');
					},
					callback: function() {
						me.setLoading(false);
					},
					success: function() {
						me.fireEvent('reload');
						Ext.Msg.alert('提示', '删除成功');
					}
				});
			}
		});
	},

	doImportStruct: function() {
		var me = this,
			dialog = Ext.create('App.view.common.window.UploadImportFile', {
				title: '导入ACT结构',
				autoShow: true,
				uploadUrl: App.globalConfig.path + '/act/import-excel',
				tplUrl: App.globalConfig.resPrefix + '/template/ACT结构维护-导入结构-导入模板.xlsx'
			});

		dialog.on('uploadsuccess', function(result) {
			Ext.Msg.alert('提示', '导入成功');

			me.doQuery();
		});

		dialog.on('uploadFailure', function(result) {
			Ext.Msg.alert('提示', result.message)
		});
	},

	doImportUsageStatus: function() {
		var me = this,
			dialog = Ext.create('App.view.common.window.UploadImportFile', {
				title: '导入用法状态',
				autoShow: true,
				uploadUrl: App.globalConfig.path + '/act/import-usage-status',
				tplUrl: App.globalConfig.resPrefix + '/template/ACT结构维护-导入用法状态-导入模板.xlsx'
			});

		dialog.on('uploadsuccess', function(result) {
			Ext.Msg.alert('提示', '导入成功');

			me.doQuery();
		});

		dialog.on('uploadFailure', function(result) {
			Ext.Msg.alert('提示', result.message)
		});
	},

	openUpcFnaSelectDialog: function(record) {
		var me = this;

		me.dialog = Ext.create('Ext.window.Window', {
			width: 795,
			height: 520,
			modal: true,
			resizable: false,
			autoShow: true,
			title: '选择产品FNA',
			layout: 'fit',
			items: [{
				xtype: 'gridselector',
				readUrl: App.globalConfig.path + '/pupcfna/page',
				fields: [{
					name: 'code'
				}, {
					name: 'noteZh'
				}, {
					name: 'noteEn'
				}],
				columns: [{
					text: "序号",
					xtype: 'rownumberer',
					align: 'center',
					width: 60
				}, {
					text: '产品FNA',
					dataIndex: 'code',
					flex: 1
				}, {
					text: '产品功能地址中文描述',
					dataIndex: 'noteZh',
					flex: 1
				}, {
					text: '产品功能地址英文描述',
					dataIndex: 'noteEn',
					flex: 1
				}],
				paramFields: ['code'],
				searchInputConfig: {
					flex: 1,
					labelPad: 10,
					labelWidth: 100,
					fieldLabel: '产品FNA',
					toUppercase: true
				}
			}]
		});

		me.dialog.down('gridselector').readRecord();
		me.bindDialogEvents(me.dialog);
	},

	bindDialogEvents: function(dialog) {
		var me = this,
			grid = dialog.down('gridselector'),
			btnCancel = dialog.down('[action=cancel]');

		btnCancel.on('click', function() {
			dialog.close();
		});

		grid.on('rowclick', function(that, record, tr, rowIndex, e, eOpts) {
			me.activeRecord.set({
				productUpcfnaCode: record.get('code')
			});
			dialog.close();
		});
	},

	getSaveParams: function() {
		var me = this,
			store = me.getStore(),
			updateItems = store.getUpdatedRecords() || [],
			params = me.getParams(updateItems);

		return params;
	},

	getDeleteParams: function(record) {
		var me = this;

		return {
			id: record.get('id'),
			aftersalesPart: record.get('aftersalesPart'),
			isManualCode: record.get('isManualCode'),
			parentPUpcfnaCode: record.get('parentPUpcfnaCode'),
			parentPartCode: record.get('parentPartCode'),
			partCode: record.get('partCode'),
			productUpcfnaCode: record.get('productUpcfnaCode'),
			toBeConfirmed: record.get('toBeConfirmed')
		};
	},

	getParams: function(records) {
		var me = this,
			params = [];

		Ext.each(records, function(rec) {
			var item = {
				id: rec.get('id'),
				deletedCode: rec.get('deletedCode'),
				aftersalesPart: rec.get('aftersalesPart'),
				isInheritanceStructureCode: rec.get('isInheritanceStructureCode'),
				toBeConfirmed: rec.get('toBeConfirmed'),
				parentPUpcfnaCode: rec.get('parentPUpcfnaCode'),
				parentPartCode: rec.get('parentPartCode'),
				partCode: rec.get('partCode'),
				productUpcfnaCode: rec.get('productUpcfnaCode'),
				qty: rec.get('qty'),
				usageNote: rec.get('usageNote'),
				usageStatusCode: rec.get('usageStatusCode')
			};

			params.push(item);
		});

		return params;
	},

	validateSave: function() {
		var me = this,
			view = me.getView().lockedView,
			errorEls = view.getEl().query('.x-grid-edit-cell-border-invalid');

		if (errorEls.length > 0) {
			return false;
		}

		return true;
	},

	getSelectorFieldHtml: function(value) {
		var me = this;
		var html = '<div data-ref="triggerWrap" role="presentation" class="x-form-trigger-wrap">' +
			'<div data-ref="inputWrap" role="presentation" class="x-form-text-wrap x-form-text-wrap-default">' +
			'<input  value="' + value + '" data-ref="inputEl" disabled="disabled" type="text" size="1"  aria-disabled="false"   class="x-form-field x-form-required-field x-form-text x-form-text-default  x-form-invalid-field x-form-invalid-field-default" autocomplete="off">' +
			'</div>' +
			'<div data-action="trigger"  class="x-form-trigger x-form-trigger-default x-form-browse-trigger x-form-browse-trigger-default x-trigger-index-1"></div></div>';

		return html;
	},

	dockedItems: [{
		xtype: 'form',
		dock: 'top',
		border: true,
		height: 36,
		itemId: 'subQuery',
		defaults: {
			xtype: 'basecombo',
			margin: '0 10 0 0'
		},
		layout: {
			align: 'middle',
			type: 'hbox'
		},
		bodyStyle: 'background:#fff!important',
		bodyPadding: '0 0 0 5',
		items: [{
			fieldLabel: '维修策略',
			labelWidth: 60,
			name: 'servicePolicyCode',
			withAll: true,
			value: '',
			displayFormat: '{code}-{name}',
			url: App.globalConfig.path + '/combo/service-policy/list'
		}, {
			fieldLabel: '删除标识',
			labelWidth: 60,
			name: 'deletedCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=deleted'
		}, {
			fieldLabel: '是否显示售后专用件',
			labelWidth: 120,
			name: 'showAftersalesParts',
			value: '1',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_show_aftersales_parts'
		}, {
			fieldLabel: '是否继承结构:',
			labelWidth: 80,
			name: 'isInheritanceStructureCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_inheritance_structure'
		}, {
			fieldLabel: 'PLM中结构状态',
			labelWidth: 90,
			name: 'plmStructureStatusCode',
			withAll: true,
			value: '',
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=plm_structure_status'
		}, {
			xtype: 'panel',
			flex: 1,
			layout: {
				align: 'middle',
				pack: 'end',
				type: 'hbox'
			},
			bodyStyle: 'background:#fff!important',
			items: [{
				xtype: 'button',
				action: "query",
				text: "过滤子件",
				margin: '0 10 0 0'
			}, {
				xtype: 'button',
				action: "reset",
				text: "重置"
			}]
		}]
	}],
	tbar: [{
		iconCls: 'x-fa fa-save',
		tooltip: '保存',
		text: '保存',
		itemId: 'save',
		ui: 'grid-toolbar'
	}, {
		iconCls: 'x-fa fa-file-excel-o',
		tooltip: '导出',
		text: '导出',
		itemId: 'export',
		ui: 'grid-toolbar'
	}, {
		iconCls: 'x-fa fa-file-excel-o',
		tooltip: '导入结构',
		text: '导入结构',
		itemId: 'import-struct',
		ui: 'grid-toolbar'
	}, {
		iconCls: 'x-fa fa-file-excel-o',
		tooltip: '导入用法状态',
		text: '导入用法状态',
		itemId: 'import-usage-status',
		ui: 'grid-toolbar'
	}, {
		iconCls: 'x-fa fa-edit',
		tooltip: '修改产品FNA',
		text: '修改产品FNA',
		disabled: true,
		itemId: 'update-productionupcfna',
		ui: 'grid-toolbar',
		hidden: true
	}],
	columns: [{
		xtype: 'treecolumn',
		text: '配件编码',
		dataIndex: 'partCode',
		width: 200,
		locked: true,
		sortable: false,
		renderer: function(value, metaData, record) {
			if (record.get('toBeConfirmed')) {
				metaData.tdStyle = 'color:red;';
			}
			return value;
		}
	}, {
		text: '操作',
		dataIndex: '',
		width: 120,
		locked: true,
		align: 'center',
		sortable: false,
		renderer: function(data, metadata, record) {
			var html = [],
				partCode = record.get('partCode'),
				aftersalesPart = record.get('aftersalesPart'),
				toBeconfirmed = record.get('toBeConfirmed'),
				isManualCode = record.get('isManualCode'),
				partUrl = App.globalConfig.path + '/part/detail-page/' + partCode;

			html.push('<a href="' + partUrl + '" target="_blank"  class="btn-tb-link-small">Part</a>');

			if (!(aftersalesPart || toBeconfirmed || !isManualCode)) {
				html.push('<a href="javascript:void(0);" data-action="delete" class="btn-tb-link-small">删除</a>');
			}

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '用法<br/>状态',
		dataIndex: 'usageStatusCode',
		width: 60,
		locked: true,
		tdCls: 'x-grid-edit-cell-border',
		sortable: false,
		editor: {
			xtype: 'basecombo',
			allText: '-',
			allValue: '',
			hideTrigger: true,
			url: App.globalConfig.path + '/combo/usage-status/list'
		},
		renderer: function(value, metaData, record) {
			if (record.get('level') == 1 || record.get('aftersalesPart')) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return record.get('usageStatusName');
		}
	}, {
		text: '删除<br/>标识',
		dataIndex: 'deletedCode',
		width: 60,
		locked: true,
		sortable: false,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'basecombo',
			hideTrigger: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=deleted'
		},
		renderer: function(value, metaData, record) {
			if (record.get('level') == 1 || record.get('aftersalesPart')) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return record.get('deletedName');
		}
	}, {
		text: '用量',
		dataIndex: 'qty',
		width: 70,
		locked: true,
		sortable: false,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'numberfield',
			minValue: 0.1
		},
		renderer: function(value, metaData, record) {
			var source = record.get('source'),
				level = record.get('level'),
				aftersalesPart = record.get('aftersalesPart');

			if (source == 'EBOM' || level == 1 || aftersalesPart) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return value;
		}
	}, {
		text: '是否继<br/>承结构',
		dataIndex: 'isInheritanceStructureCode',
		width: 70,
		locked: true,
		sortable: false,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'basecombo',
			allText: '-',
			allValue: '',
			withAll: true,
			hideTrigger: true,
			url: App.globalConfig.path + '/combo/common-dropdown-box/list?type=is_inheritance_structure'
		},
		renderer: function(value, metaData, record) {
			if (record.get('level') == 1 || record.get('aftersalesPart') || !record.get('toBeConfirmed')) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return record.get('isInheritanceStructureName');
		}
	}, {
		text: '结构备注',
		dataIndex: 'usageNote',
		width: 120,
		locked: true,
		sortable: false,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'textfield'
		},
		renderer: function(value, metaData, record) {
			if (record.get('level') == 1 || record.get('aftersalesPart')) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return record.get('usageNote');
		}
	}, {
		text: '产品FNA',
		dataIndex: 'productUpcfnaCode',
		width: 120,
		locked: true,
		sortable: false,
		tdCls: 'x-grid-edit-cell-border',
		renderer: function(value, metaData, record) {
			var tree = this.up('treepanel');

			metaData.style = 'padding:0';
			if (record.get('level') == 1 || !record.get('toBeConfirmed')) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
				return record.get('productUpcfnaCode');
			} else {
				return tree.getSelectorFieldHtml(value)
			}
		}
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		sortable: false,
		width: 110
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		sortable: false,
		width: 110
	}, {
		text: '产品功能地址中文描述',
		dataIndex: 'productUpcfnaNoteZh',
		sortable: false,
		width: 150
	}, {
		text: '产品功能地址英文描述',
		dataIndex: 'productUpcfnaNoteEn',
		sortable: false,
		width: 150
	}, {
		text: '售后FNA',
		dataIndex: 'salesUpcfnaCode',
		sortable: false,
		width: 100
	}, {
		text: '售后功能地址中文描述',
		dataIndex: 'salesUpcfnaNoteZh',
		sortable: false,
		width: 150
	}, {
		text: '售后功能地址英文描述',
		dataIndex: 'salesUpcfnaNoteEn',
		sortable: false,
		width: 150
	}, {
		text: '来源',
		dataIndex: 'source',
		sortable: false,
		width: 60
	}, {
		text: 'PLM中结构状态',
		dataIndex: 'plmStructureStatusName',
		sortable: false,
		width: 120
	}, {
		text: 'STE',
		dataIndex: 'steName',
		sortable: false,
		width: 80
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		sortable: false,
		width: 80
	}, {
		text: '维修支持类型',
		dataIndex: 'serviceSupportTypeName',
		sortable: false,
		width: 110
	}, {
		text: '支持类型备注',
		dataIndex: 'serviceSupportTypeNote',
		sortable: false,
		width: 110
	}, {
		text: '是否标识过维修件',
		dataIndex: 'wasServicePart',
		sortable: false,
		width: 150
	}, {
		text: '维修件类型',
		dataIndex: 'servicePartTypeName',
		sortable: false,
		width: 100
	}, {
		text: '替换类型',
		dataIndex: 'supersessionTypeName',
		sortable: false,
		width: 80
	}, {
		text: '处理建议',
		dataIndex: 'treatmentProposalName',
		sortable: false,
		width: 80
	}, {
		text: '替换新配件编码',
		dataIndex: 'newPartCode',
		sortable: false,
		width: 110
	}, {
		text: '采购需求',
		dataIndex: 'purchaseDemandName',
		sortable: false,
		width: 80
	}, {
		text: '采购状态',
		dataIndex: 'purchaseStatusName',
		sortable: false,
		width: 80
	}, {
		text: '销售状态',
		dataIndex: 'salesStatusName',
		sortable: false,
		width: 80
	}, {
		text: '系统|人为',
		dataIndex: 'isManualName',
		sortable: false,
		width: 90
	}, {
		text: '创建人',
		dataIndex: 'createdBy',
		sortable: false,
		width: 80
	}, {
		text: '创建时间',
		dataIndex: 'createdDate',
		sortable: false,
		width: 140
	}, {
		text: '修改人',
		dataIndex: 'modifiedBy',
		sortable: false,
		width: 80
	}, {
		text: '修改时间',
		dataIndex: 'modifiedDate',
		sortable: false,
		width: 140
	}],
	listeners: {
		beforerender: function(cmp, eOpts) {
			cmp.columns[0].setHeight(42);
		}
	}
});