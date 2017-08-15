Ext.define('App.view.partUsage.usageGenerate.GenerateHistory', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.generatehistory',
	requires: ['Ext.ux.component.paging.Paging'],
	multiSelect: true,
	multiSelectCheckbox: true,
	autoDestroy: true,
	width: "100%",
	flex: 1,
	extraFilters: [],
	constructor: function(config) {
		var me = this;

		me.createStore(config);
		me.callParent(arguments);
	},
	initComponent: function() {
		var me = this;

		me.bbar.store = me.getStore();
		me.callParent(arguments);
	},
	initEvents: function() {
		var me = this,
			store = me.getStore(),
			form = me.down('form'),
			btnQuery = me.down('[action=query]'),
			btnReset = me.down('[action=reset]');

		btnQuery.on('click', function() {
			me.doSearch();
		});
		btnReset.on('click', function() {
			form.reset();
		});
		store.on('beforeload', function() {
			me.addStoreFilters();
		});
	},
	doSearch: function() {
		var me = this;

		me.readRecord();
	},
	readRecord: function() {
		var me = this,
			store = me.getStore();

		store.loadPage(1);
	},
	addStoreFilters: function(store) {
		var me = this,
			store = me.getStore(),
			params = me.getParams();

		store.proxy.extraFilters = params;
	},
	getParams: function() {
		var me = this,
			params = [],
			form = me.down('form').getForm(),
			fields = form.getFields();

		Ext.each(fields.items, function(item) {
			var val = item.getValue();

			if (!Ext.isEmpty(val)) {
				params.push({
					name: item.name,
					value: val
				});
			}
		});

		return params;
	},
	createStore: function(config) {
		var me = this;

		me.store = Ext.create('Ext.ux.store.Base', {
			fields: [
				'brandCode',
				'brandName',
				'seriesCode',
				'seriesName',
				'createdBy',
				'createdDate',
				'modifedBy',
				'modifedDate'
			],
			proxyAPI: {
				read: App.globalConfig.path + '/usage/generate-log'
			},
			listeners: {
				aftererror: function(operation, response) {
					Ext.util.Common.errorHandler(response);
				}
			},
			sorters: [{
				property: 'createdDate',
				direction: 'DESC'
			}]
		});
	},
	tbar: [{
		xtype: 'form',
		layout: 'hbox',
		items: [{
			fieldLabel: '品牌',
			xtype: 'basecombo',
			name: 'brandCode',
			withAll: false,
			allowBlank: false,
			labelWidth: 40,
			url: App.globalConfig.path + '/combo/brand/list',
			clearFields: ['seriesCode'],
			margin: '0 10 0 0'
		}, {
			fieldLabel: '车系',
			xtype: 'basecombo',
			name: 'seriesCode',
			withAll: false,
			allowBlank: false,
			labelWidth: 40,
			dependFields: ['brandCode'],
			url: App.globalConfig.path + '/combo/multi-brand-series/list?type={brandCode}'
		}]
	}, '->', {
		xtype: 'button',
		action: "query",
		text: "查询"
	}, {
		xtype: 'button',
		action: "reset",
		text: "重置"
	}],
	bbar: {
		xtype: 'paging',
		dock: 'bottom',
		displayInfo: true
	},
	columns: [{
		text: "序号",
		xtype: 'rownumberer',
		align: 'center',
		width: 60
	}, {
		text: '品牌',
		dataIndex: 'brandName',
		flex: 1
	}, {
		text: '车系',
		dataIndex: 'seriesName',
		flex: 1
	}, {
		text: '生成时间',
		dataIndex: 'createdDate',
		flex: 1,
		renderer: function(data, metadata, record) {
			var createDate = record.get('createdDate');

			return Ext.util.Format.localDate(createDate);
		}
	}, {
		text: '生成人',
		dataIndex: 'createdBy',
		flex: 1
	}]
});