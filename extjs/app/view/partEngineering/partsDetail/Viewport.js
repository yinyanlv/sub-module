Ext.define('App.view.partEngineering.partsDetail.Viewport', {
	extend: 'Ext.container.Viewport',
	id: 'partsdetailviewport',
	requires: [
		'App.view.partEngineering.partsDetail.PartsProperty',
		'App.view.partEngineering.partsDetail.PartsPending',
		'App.view.partEngineering.partsDetail.PartsPurchase',
		'App.view.partEngineering.partsDetail.PartsStock',
		'App.view.partEngineering.partsDetail.PartsOther'
	],
	layout: 'fit',
	items: [{
		title: '配件详细',
		layout: 'vbox',
		xtype: 'form',
		defaults: {
			width: '100%'
		},
		bodyStyle: 'background-color:#fff',
		bodyPadding: 5,
		overflowY: true,
		items: [{
			xtype: 'partsdetailpartsproperty'
		}, {
			xtype: 'partsdetailpartspending'
		}, {
			xtype: 'partsdetailpartspurchase'
		}, {
			xtype: 'partsdetailpartsstock'
		}, {
			xtype: 'partsdetailpartsother'
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			border: true,
			layout: {
				align: 'middle',
				pack: 'center',
				type: 'hbox'
			},
			height: 'auto',
			style: 'padding-bottom: 5px;padding-top: 5px;',
			defaults: {
				width: 80
			},
			items: [{
				xtype: 'button',
				itemId: "save",
				text: "保存"
			}]
		}]
	}]
});