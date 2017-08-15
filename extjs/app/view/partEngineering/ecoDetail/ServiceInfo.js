Ext.define('App.view.partEngineering.ecoDetail.ServiceInfo', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ecodetailserviceinfo',
	padding: 5,
	cls: 'edit-grid',
	tbar: [{
		xtype: 'button',
		text: '保存',
		itemId: 'save',
		iconCls: 'x-fa fa-save',
		ui: 'grid-toolbar'
	}],
	plugins: (function() {
		var plugin = [Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})];

		return plugin;
	})(),
	initEvents: function() {
		var me = this,
			btnSave = me.down('[itemId=save]');

		btnSave.on('click', function() {
			me.doSave();
		});

		me.on({
			edit: function(editor, e) {
				me.editValidate(editor, e);
			}
		})
	},

	load: function() {
		var me = this,
			store = me.getStore();

		store.removeAll();
		store.load();
	},

	doSave: function() {
		var me = this,
			params = me.getSaveParams();

		if (!me.validateSave()) {
			Ext.Msg.alert('提示', '列表编辑有误，请检查');
			return;
		}

		if (params.length === 0) {
			Ext.Msg.alert('提示', '未做修改，无需保存');
			return;
		}

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/eco-service-determine/batch-add',
			method: 'post',
			jsonData: params,
			beforerequest: function() {
				me.setLoading('保存中...');
			},
			callback: function() {
				me.setLoading(false);
			},
			success: function() {
				me.load();
				Ext.Msg.alert('提示', '保存成功');
			}
		});
	},

	editValidate: function(editor, e) {
		var me = this;

		if (e.field === 'serviceDetermineNote') {
			me.validateServiceDetermineNoteLength(e);
		}
	},

	validateServiceDetermineNoteLength: function(e) {
		var me = this,
			val = e.value || '',
			cell = Ext.fly(e.cell);

		if (val.length > 500) {
			me.setCellInvalid(cell, '维修信息判断备注, 字段内容超出最大长度500');
		} else {
			me.clearCellInvalid(cell);
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

	getSaveParams: function() {
		var me = this,
			updateRecords = [],
			store = me.getStore(),
			updateItems = store.getUpdatedRecords() || [];

		Ext.each(updateItems, function(item) {
			var record = {
				ecoCode: App.pageConfig['ecoCode'],
				serviceDetermineTypeCode: item.get('serviceDetermineTypeCode'),
				serviceDetermineNote: item.get('serviceDetermineNote')
			};

			updateRecords.push(record);
		});

		return updateRecords;
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

	store: Ext.create('Ext.data.Store', {
		fields: [
			'serviceDetermineTypeCode',
			'serviceDetermineTypeName',
			'serviceDetermineNote'
		],
		autoLoad: false,
		proxy: {
			type: 'ajax',
			noCache: true,
			url: App.globalConfig.path + '/eco-service-determine/eco/' + App.pageConfig['ecoCode'],
			reader: {
				type: 'json'
			}
		}
	}),
	columns: [{
		xtype: 'rownumberer',
		text: '序号',
		width: 100,
		align: 'center'
	}, {
		text: '维修信息判断类型',
		dataIndex: 'serviceDetermineTypeName',
		width: 150
	}, {
		text: '维修信息判断备注',
		dataIndex: 'serviceDetermineNote',
		width: 400,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'textfield'
		}
	}]
});