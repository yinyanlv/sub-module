Ext.require([
	'Ext.Component',
	'Ext.panel.Panel',
	'Ext.tab.Panel',
	'Ext.tree.Panel',
	'Ext.list.Tree',
	'Ext.grid.*',
	'Ext.form.*',
	'Ext.layout.*',
	'Ext.container.*',
	'Ext.data.proxy.*',
	'Ext.util.Pingyin',
	'Ext.util.Common',
	'Ext.util.Common',
	'Ext.button.Segmented',
	'Ext.app.ViewController',
	'Ext.ux.TabCloseMenu',
	'Ext.util.Cookies',
	'Ext.ux.component.combo.BaseCombo',
	'Ext.ux.component.combo.TreeCombo',
	'Ext.ux.component.button.LinkButton',
	'Ext.ux.component.field.SelectorField',
	'Ext.ux.component.field.ImageField'
]);

Ext.application({
	name: 'App',
	extend: 'Ext.app.Application',
	appFolder: 'app',
	paths: {
		"App": App.globalConfig.appPath,
		'Ext.ux': App.globalConfig.uxPath
	},
	controllers: [App.pageConfig.controller],
	mainView: App.pageConfig.viewport
});

(function() {
	var url = App.globalConfig.path + '/extjs/ext/locale/ext-lang-{0}.js';
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.charset = "UTF-8";
	script.src = Ext.util.Format.format(url, App.globalConfig.lang);
	head.appendChild(script);
})();