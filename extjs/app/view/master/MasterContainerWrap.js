Ext.define('App.view.master.MasterContainerWrap', {
	extend: 'Ext.container.Container',
	xtype: 'mastercontainerwrap',
	requires: [
		'Ext.layout.container.HBox'
	],
	reference: 'mainContainerWrap',
	flex: 1,
	layout: {
		type: 'border',
		align: 'stretchmax',
		animate: true,
		animatePolicy: {
			x: true,
			width: true
		}
	}
});