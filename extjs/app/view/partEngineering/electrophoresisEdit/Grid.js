Ext.define('App.view.partEngineering.electrophoresisEdit.Grid', {
	extend: 'Ext.ux.component.grid.Grid',
	alias: 'widget.electrophoresiseditgrid',
	cls: 'edit-grid',
	multiSelectCheckbox: false,
	tbar: [{
		xtype: 'button',
		text: '保存',
		itemId: 'save',
		iconCls: 'x-fa fa-save',
		ui: 'grid-toolbar'
	}],
	bbar: null,
	border: true,
	plugins: (function() {
		var plugin = [Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit: 1
		})];

		return plugin;
	})(),
	store: Ext.create('App.store.partEngineering.ElectrophoresisEdit'),
	initEvents: function() {
		var me = this;

		me.on({
			'edit': function(editor, e) {
				me.checkLength(editor, e);
			}
		});

		this.callParent(arguments);
	},
	checkLength: function(editor, e) {
		var me = this,
			cell = Ext.fly(e.cell),
			value = e.value,
			len = 500;

		if (value.length > len) {
			me.setCellInvalid(cell, '该输入项的最大长度是' + len + '个字符');
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
	columns: [{
		text: '配件编码',
		dataIndex: 'code',
		width: 140
	}, {
		text: '配件中文名称',
		dataIndex: 'nameZh',
		editable: true,
		width: 160,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'textfield'
		}
	}, {
		text: '配件英文名称',
		dataIndex: 'nameEn',
		width: 160,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'textfield'
		}
	}, {
		text: '颜色件类型种类',
		dataIndex: 'elposPrimsColorOptionName',
		width: 120
	}, {
		text: '维修策略',
		dataIndex: 'servicePolicyName',
		width: 120
	}, {
		text: '采购需求',
		dataIndex: 'purchaseDemandName',
		width: 120
	}, {
		text: '采购状态',
		dataIndex: 'purchaseStatusName',
		width: 100
	}, {
		text: '销售状态',
		dataIndex: 'salesStatusName',
		width: 100
	}, {
		text: '备注',
		dataIndex: 'note',
		width: 180,
		tdCls: 'x-grid-edit-cell-border',
		editor: {
			xtype: 'textfield'
		}
	}]
});