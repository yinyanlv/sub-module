Ext.define('App.model.master.NavigationTree', {
	extend: 'Ext.data.Model',
	fields: [{
		name: 'text'
	}, {
		name: 'url'
	}, {
		name: 'iconCls',
		mapping: function(data) {
			var icons = {
				"100": "iconfont icon-favorite",
				"200": "iconfont icon-database",
				"300": "iconfont icon-usage",
				"400": "iconfont icon-project",
				"500": "iconfont icon-document",
				"600": "iconfont icon-image",
				"700": "iconfont icon-ready",
				"800": "iconfont icon-operation",
				"900": "iconfont icon-publish",
				"1000": "iconfont icon-task",
				"1100": "iconfont icon-setting"
			};
			if (!data.leaf && !icons[data.id]) {
				return 'x-fa fa-list-alt';
			}

			return icons[data.id] ? icons[data.id] : 'x-fa fa-list-ul';
		}
	}, {
		name: 'pingyin',
		mapping: function(data) {
			var pingyin = Ext.util.Pingyin.getFn();

			return pingyin.getFullChars(data.text || '');
		}
	}, {
		name: 'py',
		mapping: function(data) {
			var pingyin = Ext.util.Pingyin.getFn();

			return pingyin.getCamelChars(data.text || '');
		}
	}, {
		name: 'pingyins',
		mapping: function(data) {
			var chars = [],
				text = data.text || '',
				pingyin = Ext.util.Pingyin.getFn();

			for (var i = 0; i < text.length; i++) {
				chars.push(pingyin.getFullChars(text[i]).toUpperCase());
			}

			return chars;
		}
	}]
});