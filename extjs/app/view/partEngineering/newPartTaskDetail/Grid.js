Ext.define('App.view.partEngineering.newPartTaskDetail.Grid', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.newparttaskdetailgrid',
	useArrows: true,
	rootVisible: false,
	viewConfig: {
		enableTextSelection: true
	},
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
	store: Ext.create('App.store.partEngineering.NewPartTaskDetail'),
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
			edit: function(editor, e) {

				me.editValidate(editor, e);
			},
			beforeedit: function(editor, e) {
				if (me.controlEdit(e)) return false;

				var servicePolicyCode = e.record.get('servicePolicyCode');
				var servicePartTypeCode = e.record.get('servicePartTypeCode');

				if (e.field === 'generatedColors' && servicePartTypeCode !== 'CP') {
					Ext.Msg.alert('提示', '当前维修件类型非“颜色件”, 不可编辑');
					return false;
				}

				if (e.field === 'serviceSupportTypeCode' && ['Y', 'YS'].indexOf(servicePolicyCode) > -1) {
					Ext.Msg.alert('提示', '当前维修策略为"维修件/售后专用件", 不可编辑');
					return false;
				}

				me.expandCombobox(e);
			},
			validateedit: function(editor, e) {
				me.setComboboxCellText(editor, e);

				return true;
			},
			cellclick: function(view, cell, cellIndex, record, row, rowIndex, e) {
				if (e.getTarget('[data-action=complete]')) {
					Ext.Msg.confirm('提示', '您确认要完当前任务?', function(btn) {
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

	expandCombobox: function(e) {
		var me = this,
			combobox = me.columns[e.colIdx + 2].getEditor(e.record);

		if (combobox.xtype === 'basecombo') {
			window.setTimeout(function() {
				combobox.onTriggerClick();
			}, 100)
		}
	},

	controlEdit: function(e) {
		var me = this,
			status = e.record.get('status');

		if (e.field == 'servicePartTypeCode' || e.field == 'generatedColors') {
			return false;
		}

		return status === 1;
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
			url: App.globalConfig.path + '/new-part-task/save',
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
			url: App.globalConfig.path + '/new-part-task/save-finish',
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
				partCode: rec.get('partCode'),
				servicePolicyCode: rec.get('servicePolicyCode'),
				serviceSupportTypeCode: rec.get('serviceSupportTypeCode'),
				serviceSupportTypeNote: rec.get('serviceSupportTypeNote'),
				servicePartTypeCode: rec.get('servicePartTypeCode'),
				colors: rec.get('generatedColors')
			};

			params.push(item);
		});

		return params;
	},

	editValidate: function(editor, e) {
		var me = this;

		switch (e.field) {
			case 'servicePolicyCode':
				me.servicePolicyCodeChange(editor, e);
				break;
			case 'serviceSupportTypeCode':
				me.serviceSupportTypeCodeChange(editor, e);
				break;
			case 'serviceSupportTypeNote':
				me.validateSupportTypeNoteLength(e)
				me.serviceSupportTypeCodeChange(editor, e);
				break;
			case 'servicePartTypeCode':
				me.servicePartTypeCodeChagne(editor, e);
				break;
			case 'generatedColors':
				me.generatedColorsChange(editor, e);
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
				'serviceSupportTypeCode': 'serviceSupportTypeName',
				'servicePartTypeCode': 'servicePartTypeName',
				'generatedColors': 'generatedPartColorNames'
			},
			name = codeMapping[e.field];

		if (name) {
			e.record.set(name, text);
		}
	},

	servicePolicyCodeChange: function(editor, e) {
		var me = this,
			servicePolicyCode = e.value,
			serviceSupportTypeCode = e.record.get('serviceSupportTypeCode'),
			row = e.getRow(),
			cell = Ext.fly(row.query('td')[2]);

		me.unifiedValidate(e);

		// 当维修策略为由Y变成Y/YS, 清空维修支持类型
		if (e.originalValue === 'N' && ['Y', 'YS'].indexOf(e.value) > -1) {
			e.record.set('serviceSupportTypeCode', '');
			e.record.set('serviceSupportTypeName', '');
			e.record.set('serviceSupportTypeNote', '');
			me.clearCellInvalid(cell);
		}
	},

	serviceSupportTypeCodeChange: function(editor, e) {
		var me = this,
			serviceSupportTypeCode = e.value,
			servicePolicyCode = e.record.get('servicePolicyCode'),
			serviceSupportTypeNote = e.record.get('serviceSupportTypeNote'),
			row = e.getRow(),
			cell = e.getCell(),
			noteCell = Ext.fly(row.query('td')[3]);

		me.unifiedValidate(e);

		// 当维修策略为N, 维修支持类型为非空
		if (servicePolicyCode === 'N' && !Ext.isEmpty(serviceSupportTypeCode)) {
			me.clearCellInvalid(cell);
		}

		// 当维修支持类型为PN/NOTE, Part/Note为空
		if ((serviceSupportTypeCode === 'PN' || serviceSupportTypeCode === 'NOTE') && Ext.isEmpty(serviceSupportTypeNote)) {
			me.setCellInvalid(noteCell, '当维修支持类型为(零件号/备注), Part/Note不能为空');
		}

		// 当维修支持类型由PN/NOTE，改这其他则清空Part/Note
		if (['PN', 'NOTE'].indexOf(e.originalValue) > -1 && ['PN', 'NOTE'].indexOf(e.value) == -1) {
			e.record.set('serviceSupportTypeNote', '');
			me.clearCellInvalid(noteCell);
		}
	},

	servicePartTypeCodeChagne: function(editor, e) {
		var me = this,
			servicePartTypeCode = e.record.get('servicePartTypeCode'),
			generatedColors = e.record.get('generatedColors'),
			row = e.getRow(),
			cell = Ext.fly(row.query('td')[5]);

		// 当维修策略为由Y变成Y/YS, 清空维修支持类型
		if (servicePartTypeCode === 'CP' && Ext.isEmpty(generatedColors)) {
			me.setCellInvalid(cell, '当维修件类型为(颜色件), 颜色色件颜色不能为空');
		}

		// 当维修支持类型由PN/NOTE，改这其他则清空Part/Note
		if (e.originalValue == 'CP' && e.value !== 'CP') {
			e.record.set('generatedColors', []);
			e.record.set('generatedPartColorNames', '');
			me.clearCellInvalid(cell);
		}

		// 当维修支持类型由PN/NOTE，改这其他则清空Part/Note
		if (e.originalValue == 'CP' && e.value !== 'CP') {
			e.record.set('generatedColors', []);
			e.record.set('generatedPartColorNames', '');
			me.clearCellInvalid(cell);
		}
	},

	generatedColorsChange: function(editor, e) {
		var me = this,
			row = e.getRow(),
			cell = Ext.fly(e.cell),
			servicePartTypeCode = e.record.get('servicePartTypeCode'),
			generatedColors = e.record.get('generatedColors');

		if (servicePartTypeCode == 'CP' && Ext.isEmpty(generatedColors)) {
			me.setCellInvalid(cell, '当维修件类型为(颜色件), 颜色色件颜色不能为空');
		}
	},

	setColorPartColorDisable: function(e, status) {
		var me = this,
			combobox = me.columns[e.colIdx + 3].getEditor(e.record);

		combobox.setDisabled(status);
	},

	validateSupportTypeNoteLength: function(e) {
		var me = this,
			val = e.value || '',
			cell = Ext.fly(e.cell);

		if (val.length > 500) {
			me.setCellInvalid(cell, 'Part/Note 字段内容超出最大长度500');
		}
	},

	unifiedValidate: function(e) {
		var me = this,
			servicePolicyCode = e.record.get('servicePolicyCode'),
			serviceSupportTypeCode = e.record.get('serviceSupportTypeCode'),
			row = e.getRow(),
			cell = Ext.fly(row.query('td')[2]);

		// 当维修策略为N, 维修支持类型为空
		if (servicePolicyCode === 'N' && Ext.isEmpty(serviceSupportTypeCode)) {
			me.setCellInvalid(cell, '当维修策略为非维件, 维修支持类型不能为空');
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

	validateSave: function() {
		var me = this,
			view = me.getView(),
			errorEls = view.getEl().query('.x-grid-edit-cell-border-invalid');

		if (errorEls.length > 0) {
			return false;
		}

		return true;
	},

	columns: [{
		xtype: 'treecolumn',
		text: '配件编码',
		dataIndex: 'partCode',
		width: 180,
		sortable: false,
		locked: true
	}, {
		text: '操作',
		dataIndex: '',
		width: 80,
		locked: true,
		align: 'center',
		sortable: false,
		renderer: function(data, metadata, record) {
			var html = [];

			if (!(record.get('status') === 1)) {
				html.push('<a href="javascript:void(0);" data-action="complete" class="btn-tb-link-small">完成</a>');

				return html.join('&nbsp;&nbsp;');
			}
		}
	}, {
		text: '任务状态',
		dataIndex: 'statusName',
		sortable: false,
		width: 85
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyCode',
		width: 100,
		tdCls: 'x-grid-edit-cell-border',
		sortable: false,
		editor: {
			xtype: 'basecombo',
			allText: '-',
			allValue: '',
			withAll: true,
			displayFormat: '{code}-{name}',
			name: "servicePolicyCode",
			url: App.globalConfig.path + '/combo/service-policy/list'
		},
		renderer: function(value, metaData, record) {
			if (record.get('status') === 1) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return record.get('servicePolicyName');
		}
	}, {
		text: '维修支持类型',
		dataIndex: 'serviceSupportTypeCode',
		width: 120,
		tdCls: 'x-grid-edit-cell-border',
		sortable: false,
		editor: {
			xtype: 'basecombo',
			allText: '-',
			allValue: '',
			withAll: true,
			name: "serviceSupportTypeCode",
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
		width: 120,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'textfield'
		},
		sortable: false,
		renderer: function(value, metaData, record) {
			if (record.get('status') === 1) {
				metaData.tdCls = 'x-grid-edit-cell-border-clear';
			}
			return record.get('serviceSupportTypeNote');
		}
	}, {
		text: '维修件类型',
		dataIndex: 'servicePartTypeCode',
		width: 100,
		tdCls: 'x-grid-edit-cell-border',
		sortable: false,
		editor: {
			xtype: 'basecombo',
			url: App.globalConfig.path + '/combo/service-part-type/list'
		},
		renderer: function(value, metaData, record) {
			return record.get('servicePartTypeName');
		}
	}, {
		text: '生成颜色',
		dataIndex: 'generatedColors',
		width: 120,
		tdCls: 'x-grid-edit-cell-border',
		sortable: false,
		editor: {
			xtype: 'basecombo',
			multiSelect: true,
			name: 'generatedColors',
			url: App.globalConfig.path + '/combo/part-color/list'
		},
		renderer: function(value, metaData, record) {
			return record.get('generatedPartColorNames');
		}
	}, {
		text: '设计颜色',
		dataIndex: 'plmGeneratedColorNames',
		sortable: false,
		width: 90
	}, {
		text: '颜色',
		dataIndex: 'colorName',
		sortable: false,
		width: 90
	}, {
		text: '配件中文名称',
		dataIndex: 'partNameZh',
		sortable: false,
		width: 120
	}, {
		text: '配件英文名称',
		dataIndex: 'partNameEn',
		sortable: false,
		width: 120
	}, {
		text: '推荐维修策略',
		dataIndex: 'recommendServicePolicyName',
		sortable: false,
		width: 120
	}, {
		text: '是否颜色件(PLM)',
		dataIndex: 'plmIsColorPartName',
		sortable: false,
		width: 120
	}, {
		text: 'ECO编码',
		dataIndex: 'ecoCode',
		sortable: false,
		width: 120
	}, {
		text: 'ECR编码',
		dataIndex: 'ecrCode',
		sortable: false,
		width: 120
	}, {
		text: '用量',
		dataIndex: 'qty',
		sortable: false,
		width: 120
	}, {
		text: '推荐STE',
		dataIndex: 'recommendSteName',
		sortable: false,
		width: 120
	}, {
		text: '当前STE',
		dataIndex: 'steName',
		sortable: false,
		width: 120
	}, {
		text: '任务开始时间',
		dataIndex: 'startDate',
		sortable: false,
		width: 140
	}, {
		text: '任务结束时间',
		dataIndex: 'endDate',
		sortable: false,
		width: 140
	}]
});