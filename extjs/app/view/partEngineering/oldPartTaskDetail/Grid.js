Ext.define('App.view.partEngineering.oldPartTaskDetail.Grid', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.oldparttaskdetailgrid',
	useArrows: true,
	rootVisible: false,
	cls: 'edit-grid',

	selModel: {
		selType: 'checkboxmodel',
		injectCheckbox: 0
	},
	plugins: (function() {
		var plugin = [Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})];

		return plugin;
	})(),
	store: Ext.create('App.store.partEngineering.OldPartTaskDetail'),
	tbar: [{
		xtype: 'button',
		text: '保存',
		itemId: 'save',
		iconCls: 'x-fa fa-save',
		ui: 'grid-toolbar',
		exportUrl: App.globalConfig.path + '/user-type/export'
	}, {
		xtype: 'button',
		text: '批量完成',
		itemId: 'batch-complete',
		singleSelectEnable: true,
		iconCls: 'iconfont icon-edit',
		ui: 'grid-toolbar'
	}],
	initEvents: function() {
		var me = this,
			btnSave = me.down('[itemId=save]'),
			btnBatchComponent = me.down('[itemId=batch-complete]');

		me.on({
			'edit': function(editor, e) {
				me.editValidate(editor, e);
			},
			beforeedit: function(editor, e) {
				if (me.controlEdit(e)) return false;

				var servicePolicyCode = e.record.get('servicePolicyCode');

				if (e.field === 'serviceSupportTypeCode' && ['Y', 'YS'].indexOf(servicePolicyCode) > -1) {
					Ext.Msg.alert('提示', '当前维修策略为"维修件/售后专用件", 不可编辑');
					return false;
				}

				me.expandCombobox(e);

				if (e.field === 'treatmentProposalCode') {
					me.filterTreatmentProposal(e);
				}
			},
			'validateedit': function(editor, e) {
				me.setComboboxCellText(editor, e);

				return true;
			},
			'cellclick': function(view, cell, cellIndex, record, row, rowIndex, e) {
				if (e.getTarget('[data-action=complete]')) {
					Ext.Msg.confirm('提示', '您确认要完成当前任务?', function(btn) {
						if (btn === 'yes') {
							var params = me.getSingleComponentParams(record);

							me.doSaveAndComponent(params);
						}
					});
				}
			}
		});

		btnSave.on('click', function() {
			me.doSave();
		});

		btnBatchComponent.on('click', function() {
			var params = me.getBatchComponentParams();

			if (params.length > 0) {
				Ext.Msg.confirm('提示', '您确认要完成当前选中记录?', function(btn) {
					if (btn === 'yes') {
						me.doSaveAndComponent(params);
					}
				});
			} else {
				Ext.Msg.alert('提示', '未选中记录');
			}
		});
	},

	load: function() {
		var me = this,
			store = me.getStore();

		store.removeAll();
		store.load();
	},

	controlEdit: function(e) {
		var me = this,
			status = e.record.get('status');

		return status === 1;
	},

	expandCombobox: function(e) {
		var me = this,
			combobox = me.columns[e.colIdx - 1].getEditor(e.record);

		if (combobox.xtype === 'basecombo') {
			window.setTimeout(function() {
				combobox.onTriggerClick();
			}, 100)
		}
	},

	filterTreatmentProposal: function(e) {
		var me = this,
			reg,
			typeCode = e.record.get('supersessionTypeCode'),
			combobox = me.columns[e.colIdx - 1].getEditor(e.record);

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
			property: "code",
			value: reg
		}]);
	},

	doSave: function() {
		var me = this,
			params = me.getSaveParams();

		if (params.length === 0) {
			Ext.Msg.alert('提示', '未做修改，无需保存');
			return;
		}

		me.checkCellNotEmpty();

		if (!me.validateSave(params)) {
			Ext.Msg.alert('提示', '列表填写有误，请查检查列表错误');
			return;
		}

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/old-part-task/save',
			method: 'PUT',
			jsonData: params,
			beforerequest: function() {
				me.fireEvent('beforesave');
			},
			callback: function() {
				me.fireEvent('aftersave');
			},
			success: function() {
				me.load();
				Ext.Msg.alert('提示', '保存成功');
			}
		});
	},

	doSaveAndComponent: function(params) {
		var me = this;

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/old-part-task/save-finish',
			method: 'PUT',
			jsonData: params,
			beforerequest: function() {
				me.fireEvent('beforesave');
			},
			callback: function() {
				me.fireEvent('aftersave');
			},
			success: function() {
				me.load();
				Ext.Msg.alert('提示', '操作成功');
			}
		});
	},

	getSingleComponentParams: function(record) {
		var me = this,
			params = me.getParams([record]);

		return params;
	},

	getBatchComponentParams: function() {
		var me = this,
			selectionRecords = me.getSelectionModel().getSelection(),
			params = me.getParams(selectionRecords);

		return params;
	},

	getSaveParams: function() {
		var me = this,
			store = me.getStore(),
			updateItems = store.getUpdatedRecords() || [],
			params = me.getParams(updateItems);

		return params;
	},

	getParams: function(records) {
		var me = this,
			params = [];

		Ext.each(records, function(rec) {
			var item = {
				supersessionId: rec.get('supersessionId'),
				partCode: rec.get('partCode'),
				servicePolicyCode: rec.get('servicePolicyCode'),
				changeReasonCode: rec.get('changeReasonCode'),
				serviceSupportTypeCode: rec.get('serviceSupportTypeCode'),
				serviceSupportTypeNote: rec.get('serviceSupportTypeNote'),
				newPartCode: rec.get('newPartCode'),
				supersessionTypeCode: rec.get('supersessionTypeCode'),
				treatmentProposalCode: rec.get('treatmentProposalCode'),
				supersessionNote: rec.get('supersessionNote')
			};

			params.push(item);
		});

		return params;
	},

	editValidate: function(editor, e) {
		var me = this;

		switch (e.field) {
			case 'servicePolicyCode':
				me.servicePolicyChange(editor, e);
				break;
			case 'serviceSupportTypeCode':
				me.serviceSupportTypeChange(editor, e);
				break;
			case 'serviceSupportTypeNote':
				me.validateSupportTypeNoteLength(e);
				me.checkServiceSupportTypeNote(e);
				break;
			case 'newPartCode':
				me.validateNewPartCodeLength(e);
				me.newPartChange(editor, e);
				break;
			case 'supersessionTypeCode':
				me.checkSupersessionNotEmpty(editor, e);
				break;
			case 'treatmentProposalCode':
				me.checkSupersessionNotEmpty(editor, e);
				break;
			case 'supersessionNote':
				me.validateSupersessionNoteLength(e);
				break;
			default:
				break;
		}
	},

	setComboboxCellText: function(editor, e) {
		var me = this,
			editor = e.column.getEditor(),
			text = editor.getRawValue(),
			value = editor.getValue(),
			codeMapping = {
				'servicePolicyCode': 'servicePolicyName',
				'changeReasonCode': 'changeReasonName',
				'serviceSupportTypeCode': 'serviceSupportTypeName',
				'supersessionTypeCode': 'supersessionTypeName',
				'treatmentProposalCode': 'treatmentProposalName'
			},
			name = codeMapping[e.field];

		if (name) {
			e.record.set(name, text);
		}
	},

	servicePolicyChange: function(editor, e) {
		var me = this,
			row = e.getRow(),
			servicePolicyCode = e.value,
			serviceSupportTypeCode = e.record.get('serviceSupportTypeCode'),
			serviceSupportTypeCell = Ext.fly(row.query('td')[6]);

		// 检查 "维个支持类型" 为空
		me.checkServiceSupportType(e);

		// 当维修策略为由N变成Y/YS, 清空维修支持类型
		if (e.originalValue === 'N' && ['Y', 'YS'].indexOf(e.value) > -1) {
			e.record.set('serviceSupportTypeCode', '');
			e.record.set('serviceSupportTypeName', '');
			e.record.set('serviceSupportTypeNote', '');
			me.clearCellInvalid(serviceSupportTypeCell);
		}
	},

	serviceSupportTypeChange: function(editor, e) {
		var me = this,
			serviceSupportTypeCode = e.value,
			servicePolicyCode = e.record.get('servicePolicyCode'),
			row = e.getRow(),
			cell = e.getCell(),
			noteCell = Ext.fly(row.query('td')[7]);

		me.checkServiceSupportType(e);

		// 当维修策略为N, 维修支持类型为非空
		if (servicePolicyCode === 'N' && !Ext.isEmpty(serviceSupportTypeCode)) {
			me.clearCellInvalid(cell);
		}

		me.checkServiceSupportTypeNote(e);

		// 当维修支持类型由PN/NOTE，改这其他则清空Part/Note
		if (['PN', 'NOTE'].indexOf(e.originalValue) > -1 && ['PN', 'NOTE'].indexOf(e.value) == -1) {
			e.record.set('serviceSupportTypeNote', '');
			me.clearCellInvalid(noteCell);
		}
	},

	newPartChange: function(editor, e) {
		var me = this,
			row = e.getRow();

		if (Ext.isEmpty(e.value)) {
			e.record.set('supersessionTypeCode', '');
			e.record.set('treatmentProposalCode', '');
			e.record.set('supersessionTypeName', '');
			e.record.set('treatmentProposalName', '');
			e.record.set('supersessionNote', '');
		} else {
			me.checkSupersessionNotEmpty(editor, e);
		}
	},

	checkSupersessionNotEmpty: function(editor, e) {
		var me = this,
			row = e.getRow(),
			newPartCode = e.record.get('newPartCode'),
			supersessionTypeCode = e.record.get('supersessionTypeCode'),
			treatmentProposalCode = e.record.get('treatmentProposalCode'),
			supersessionTypeCell = Ext.fly(row.query('td')[9]),
			treatmentProposalCodeCell = Ext.fly(row.query('td')[10]);

		if (!Ext.isEmpty(newPartCode)) {
			if (Ext.isEmpty(supersessionTypeCode)) {
				me.setCellInvalid(supersessionTypeCell, '当新件编码不为空，替换类型必填');
			}
			if (supersessionTypeCode !== 'NN' && Ext.isEmpty(treatmentProposalCode)) {
				me.setCellInvalid(treatmentProposalCodeCell, '当新件编码不为空, 处理建议必填');
			}
		}
	},

	checkServiceSupportType: function(e) {
		var me = this,
			servicePolicyCode = e.record.get('servicePolicyCode'),
			serviceSupportTypeCode = e.record.get('serviceSupportTypeCode'),
			row = e.getRow(),
			cell = Ext.fly(row.query('td')[6]);

		// 当维修策略为N, 维修支持类型为空
		if (servicePolicyCode === 'N' && Ext.isEmpty(serviceSupportTypeCode)) {
			me.setCellInvalid(cell, '当维修策略为非维件, 维修支持类型不能为空');
		}
	},

	checkServiceSupportTypeNote: function(e) {
		var me = this,
			row = e.getRow(),
			noteCell = Ext.fly(row.query('td')[7]),
			serviceSupportTypeCode = e.record.get('serviceSupportTypeCode'),
			serviceSupportTypeNote = e.record.get('serviceSupportTypeNote');

		// 当维修支持类型为PN/NOTE, Part/Note为空 则提示
		if (['PN', 'NOTE'].indexOf(serviceSupportTypeCode) > -1 && Ext.isEmpty(serviceSupportTypeNote)) {
			me.setCellInvalid(noteCell, '当维修支持类型为(零件号/备注), Part/Note不能为空');
		}
	},

	validateSupportTypeNoteLength: function(e) {
		var me = this,
			val = e.value || '',
			cell = Ext.fly(e.cell),
			serviceSupportTypeCode = e.record.get('serviceSupportTypeCode');

		if (serviceSupportTypeCode === 'PN') {
			if (val.length > 50) {
				me.setCellInvalid(cell, 'Part/Note 字段内容超出最大长度50');
			}
		} else if (serviceSupportTypeCode === 'NOTE') {
			if (val.length > 500) {
				me.setCellInvalid(cell, 'Part/Note 字段内容超出最大长度500');
			}
		}
	},

	validateNewPartCodeLength: function(e) {
		var me = this,
			val = e.value || '',
			cell = Ext.fly(e.cell);

		if (val.length > 50) {
			me.setCellInvalid(cell, '新件编码字段内容超出最大长度50');
		}
	},

	validateSupersessionNoteLength: function(e) {
		var me = this,
			val = e.value || '',
			cell = Ext.fly(e.cell);

		if (val.length > 500) {
			me.setCellInvalid(cell, '替换备注字段内容超出最大长度500');
		}
	},

	setCellInvalid: function(cell, errortip) {
		var me = this;

		me.clearCellInvalid(cell);
		cell.addCls("x-grid-edit-cell-border-invalid");
		cell.set({
			'data-errorqtip': errortip
		});
	},

	clearCellInvalid: function(cell) {
		var me = this;

		cell.removeCls("x-grid-edit-cell-border-invalid");
		cell.el.dom.removeAttribute('data-errorqtip');
	},

	checkCellNotEmpty: function() {
		var me = this,
			updateIds = [],
			store = me.getStore(),
			updateItems = store.getUpdatedRecords() || [];

		Ext.each(updateItems, function(item) {
			updateIds.push(item.get('id'));
		});
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

	columns: [{
		xtype: 'treecolumn',
		text: '旧件编码',
		dataIndex: 'partCode',
		width: 180,
		align: 'center',
		locked: true,
		sortable: false,
		height: 70
	}, {
		text: '操作',
		width: 80,
		locked: true,
		align: 'center',
		height: 70,
		sortable: false,
		renderer: function(data, metadata, record) {
			var html = [];

			html.push('<a href="javascript:void(0);" data-action="complete" class="btn-tb-link-small">完成</a>');

			return html.join('&nbsp;&nbsp;');
		}
	}, {
		text: '任务状态',
		dataIndex: 'statusName',
		width: 100,
		align: 'center',
		locked: true,
		height: 70,
		sortable: false,
		style: 'border-right-width: 1px'
	}, {
		locked: true,
		style: 'border-right-width: 1px',
		columns: [{
			defaults: {
				align: 'center',
				width: 100,
				sortable: false,
				style: 'border-top: 1px solid #abdbdf; border-right-width: 1px'
			},
			header: '旧件维修策略重新确认',
			dataIndex: '',
			columns: [{
				text: '维修策略',
				dataIndex: 'servicePolicyCode',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'basecombo',
					allText: '-',
					allValue: '',
					withAll: true,
					displayFormat: '{code}-{name}',
					url: App.globalConfig.path + '/combo/service-policy/list'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('servicePolicyName');
				}
			}, {
				text: '变更原因',
				dataIndex: 'changeReasonCode',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'basecombo',
					allText: '-',
					allValue: '',
					withAll: true,
					url: App.globalConfig.path + '/combo/sc-change-reason/list'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('changeReasonName');
				}
			}, {
				text: '维修支持类型',
				dataIndex: 'serviceSupportTypeCode',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'basecombo',
					allText: '-',
					allValue: '',
					withAll: true,
					displayFormat: '{code}-{name}',
					url: App.globalConfig.path + '/combo/service-support-type/list'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('serviceSupportTypeName');
				}
			}, {
				text: 'Part/Note',
				dataIndex: 'serviceSupportTypeNote',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'textfield'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('serviceSupportTypeNote');
				}
			}]
		}]
	}, {
		locked: true,
		columns: [{
			defaults: {
				align: 'center',
				width: 100,
				sortable: false,
				style: 'border-top: 1px solid #abdbdf; border-right-width: 1px'
			},
			header: '替换信息维护',
			dataIndex: '',
			columns: [{
				text: '新件编码',
				dataIndex: 'newPartCode',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'textfield'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('newPartCode');
				}
			}, {
				text: '替换类型',
				dataIndex: 'supersessionTypeCode',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'basecombo',
					allText: '-',
					allValue: '',
					withAll: true,
					displayFormat: '{code}-{name}',
					url: App.globalConfig.path + '/combo/supersession-type/list'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('supersessionTypeName');
				}
			}, {
				text: '处理建议',
				dataIndex: 'treatmentProposalCode',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'basecombo',
					allText: '-',
					allValue: '',
					withAll: true,
					displayFormat: '{code}-{name}',
					url: App.globalConfig.path + '/combo/treatment-proposal/list'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('treatmentProposalName');
				}
			}, {
				text: '替换备注',
				dataIndex: 'supersessionNote',
				tdCls: 'x-grid-edit-cell-border',
				editor: {
					xtype: 'textfield'
				},
				renderer: function(value, metaData, record) {
					if (record.get('status') === 1) {
						metaData.tdCls = 'x-grid-edit-cell-border-clear';
					}
					return record.get('supersessionNote');
				}
			}, {
				text: '预估断点时间',
				dataIndex: 'forecastBreakPointDate'
			}]
		}]
	}, {
		columns: [{
			defaults: {
				align: 'center',
				width: 100,
				sortable: false,
				style: 'border-top: 1px solid #abdbdf; border-right-width: 1px'
			},
			header: '旧新件信息',
			dataIndex: '',
			style: 'border-right-width: 1px',
			columns: [{
				text: '旧件中文名',
				dataIndex: 'partNameZh'
			}, {
				text: '旧件英文名',
				dataIndex: 'partNameEn'
			}, {
				text: '是否标识过维修件',
				dataIndex: 'wasServicePart'
			}, {
				text: '新件中文名',
				dataIndex: 'newPartNameZh'
			}, {
				text: '新件英文名',
				dataIndex: 'newPartNameEn'
			}, {
				text: '新件维修策',
				dataIndex: 'newServicePolicyName'
			}]
		}]
	}, {
		columns: [{
			defaults: {
				align: 'center',
				width: 100,
				sortable: false,
				style: 'border-top: 1px solid #abdbdf; border-right-width: 1px'
			},
			header: '其他参考信息',
			dataIndex: '',
			columns: [{
				text: 'ECO编码',
				dataIndex: 'ecoCode'
			}, {
				text: 'ECR编码',
				dataIndex: 'ecrCode'
			}, {
				text: '任务创建日',
				dataIndex: 'startDate'
			}, {
				text: '任务结束日',
				dataIndex: 'endDate'
			}, {
				text: '旧件SMT',
				dataIndex: 'smtName'
			}, {
				text: '来源',
				dataIndex: 'source'
			}, {
				text: '旧件备注(SAP)',
				dataIndex: 'sapNote'
			}, {
				text: '旧件备注',
				dataIndex: 'afterSaleNote'
			}, {
				text: '推荐STE',
				dataIndex: 'recommendSteName'
			}, {
				text: '当前STE',
				dataIndex: 'steName'
			}]
		}]
	}]
});