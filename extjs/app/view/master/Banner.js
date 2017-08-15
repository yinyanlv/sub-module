Ext.define('App.view.master.Banner', {
	extend: 'Ext.toolbar.Toolbar',
	alias: 'widget.masterbanner',
	height: 50,
	itemId: 'headerBar',
	padding: 0,
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	cls: 'app-header',
	items: [{
		border: true,
		xtype: 'component',
		reference: 'senchaLogo',
		cls: 'header-logo',
		html: '<a class="main-logo-wrap" href="' + App.globalConfig.path + '">' +
			'<div class="main-logo">' +
			'<img src="' + App.globalConfig.path + '/extjs/resources/images/logo.png">' +
			'维修配件主数据管理系统</div>' +
			'</a>',
		width: (function() {
			var status = (Ext.util.Cookies.get('nav-status') == 'true');

			return status ? 64 : 250;
		})()
	}, {
		margin: '0 10 0 0',
		ui: 'header',
		iconCls: 'iconfont icon-collapse-left',
		id: 'main-navigation-btn',
		handler: 'onToggleNavigationSize'
	}, '->', {
		id: 'user_info',
		html: Ext.get("header_usertitle_template").getHtml(),
		margin: '0 0 0 8',
		padding: '7px 10px 7px',
		iconCls: 'iconfont icon-account',
		ui: 'header-user',
		border: false,
		listeners: {
			click: 'onUserInfoClick'
		}
	}]
});