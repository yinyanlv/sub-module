Ext.define('App.view.partEngineering.newPartTaskDetail.Form', {
	extend: 'Ext.form.Panel',
	alias: 'widget.newparttaskdetailform',
	bodyPadding: 5,
	defaults: {
		border: 1,
		bodyPadding: 5,
		margin: '0 0 5 0',
		width: '100%'
	},
	border: false,
	layout: 'vbox',
	overflowY: true,

	load: function(record) {
		var me = this,
			form = me.getForm(),
			partCode = record.get('partCode');

		Ext.util.Common.ajax({
			url: App.globalConfig.path + '/new-part-task/part-detail/' + partCode,
			method: 'GET',
			beforerequest: function() {
				me.setLoading(true);
			},
			callback: function() {
				me.setLoading(false);
			},
			success: function(root) {
				var result = root.result || {};

				me.bindFormData(result.part);
				me.bindUpcFnaGridData(result.pupcfnas);
				me.bindPartStructureData(result.newPartTaskActs);
			}
		});
	},

	bindFormData: function(data) {
		var me = this,
			form = me.getForm();

		form.setValues(data);
	},

	bindUpcFnaGridData: function(data) {
		var me = this,
			grid = me.down('[itemId=upcfna-grid]');

		grid.getStore().loadData(data);
	},

	bindPartStructureData: function(data) {
		var me = this,
			grid = me.down('[itemId=part-structure]');

		grid.getStore().loadData(data);
	},

	clearForm: function() {
		var me = this,
			form = me.getForm(),
			grid1 = me.down('[itemId=upcfna-grid]'),
			grid2 = me.down('[itemId=part-structure]');

		form.reset();
		grid1.getStore().removeAll();
		grid2.getStore().removeAll();
	},
	items: [{
		layout: 'column',
		defaults: {
			columnWidth: 0.5,
			xtype: 'textfield',
			height: 16,
			margin: '0 5 5 0',
			labelWidth: 90,
			readOnly: true
		},
		items: [{
			fieldLabel: '配件编码',
			name: 'code'
		}, {
			fieldLabel: '配件中文名称',
			name: 'nameZh'
		}, {
			fieldLabel: '配件英文名称',
			name: 'nameEn'
		}, {
			fieldLabel: '配件备注(DRE)',
			name: 'description'
		}, {
			fieldLabel: '来源',
			name: 'source'
		}, {
			fieldLabel: '备注（售后）',
			name: 'afterSaleNote'
		}, {
			fieldLabel: '备注（SAP）',
			name: 'sapNote'
		}]
	}, {
		layout: 'column',
		defaults: {
			columnWidth: 0.5,
			xtype: 'textfield',
			height: 16,
			margin: '0 5 5 0',
			labelWidth: 90,
			readOnly: true
		},
		items: [{
			fieldLabel: '设计阶段',
			name: 'designStageName'
		}, {
			fieldLabel: 'SMT',
			name: 'smtName'
		}, {
			fieldLabel: '参考生产件号',
			name: 'referProductionPartCode'
		}, {
			fieldLabel: '设计职责',
			name: 'designResponsibility'
		}, {
			fieldLabel: '配件类型(PLM)',
			name: 'plmPartType'
		}, {
			fieldLabel: '分组号',
			name: ''
		}, {
			fieldLabel: '所有者(PLM)',
			name: 'plmOwner'
		}, {
			fieldLabel: '初始项目',
			name: 'initialProject'
		}]
	}, {
		xtype: 'gridpanel',
		title: 'FNA',
		itemId: 'upcfna-grid',
		height: 150,
		store: Ext.create('Ext.data.Store'),
		columns: [{
			dataIndex: 'code',
			text: '产品FNA',
			width: 140
		}, {
			dataIndex: 'noteEn',
			text: '产品功能地址英文描述',
			width: 150
		}, {
			dataIndex: 'noteZh',
			text: '产品功能地址中文描述',
			width: 200
		}]
	}, {
		xtype: 'gridpanel',
		title: '所属结构',
		itemId: 'part-structure',
		flex: 1,
		store: Ext.create('Ext.data.Store'),
		columns: [{
			dataIndex: 'parentNo',
			text: 'Parent NO',
			width: 120
		}, {
			dataIndex: 'finalPartNo',
			text: 'Final Part NO',
			width: 120
		}, {
			dataIndex: 'parentNoName',
			text: '父配件号名称',
			width: 130
		}, {
			dataIndex: 'finalPartNoName',
			text: '根配件号名称',
			width: 130
		}]
	}]
});