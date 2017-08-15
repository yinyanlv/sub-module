Ext.define('Ext.ux.store.Base', {
	extend: 'Ext.data.Store',
	autoLoad: false,
	autoSync: true,
	autoDestroy: true,
	remoteSort: true,
	pageSize: 20,
	extraFilters: null,

	constructor: function(config) {
		config = config || {};

		this.buildProxy(config);

		this.callParent([config]);
	},

	buildProxy: function(config) {
		var me = this;

		config.proxy = Ext.create('Ext.ux.proxy.Rest', {
			reader: {
				method: 'get',
				type: 'json',
				rootProperty: 'list',
				totalProperty: "total"
			},
			writer: {
				type: 'json',
				writeAllFields: false
			},
			extraFilters: config.extraFilters || me.extraFilters,
			api: me.proxyAPI || config.proxyAPI,
			noCache: true,
			listeners: {
				exception: function(that, response, operation, eOpts) {
					me.fireEvent("aftererror", operation, response);
				}
			}
		});
	},

	listeners: {
		write: function(store, operation) {
			var me = this;

			me.fireEvent("aftersuccess", operation);
		}
	}
});