Ext.define('Ext.ux.component.viewport.Base', {
	extend: 'Ext.panel.Panel',
	requires: ['Ext.ux.plugin.LabelRequired'],
	layout: {
		type: 'vbox'
	},
	height: 300,
	defaults: {
		border: true,
		margin: '5 0 0 0',
		width: "100%"
	}
});