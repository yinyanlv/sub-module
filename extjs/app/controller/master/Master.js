Ext.define('App.controller.master.Master', {
	extend: 'Ext.app.Controller',
	requires: [
		'App.view.master.Home',
		'App.store.master.NavigationTree'
	],
	stores: ['master.NavigationTree'],
	views: ['master.Viewport'],

	popstateChange: false,

	init: function() {
		var me = this;

		me.control({
			'#navigationTreeList': {
				itemclick: function(that, record) {
					me.loadPage(record.node);
				}
			},
			'masterbasemenulist': {
				selectrow: function(id) {
					me.loadPage(id.toString());
				}
			},
			'viewport': {
				afterrender: function() {
					var me = this;

					me.bindWindowEvents();
					me.bindShortcurKeyEvents();
					me.bindTreeStoreEvents();
					me.addTab('home', '首&nbsp;&nbsp;页', false, null, null);
				}
			},
			'#tabs': {
				remove: function(that, tab, eOpts) {
					me.closeTab(tab);
				}
			}
		});

		this.callParent(arguments);
	},

	bindWindowEvents: function() {
		var me = this,
			store = me.getMasterNavigationTreeStore();

		window.onpopstate = Ext.bind(function() {
			me.popstateChange = true;
			me.restoreTabs(store, true);
		}, this);
	},

	bindTreeStoreEvents: function() {
		var me = this,
			treeList = Ext.getCmp("navigationTreeList"),
			store = me.getMasterNavigationTreeStore();

		store.on('load', function(that, records, successful, operation, node, eOpts) {
			me.restoreTabs(that);
			treeList.fireEvent('treeloaded');
		});
	},

	bindShortcurKeyEvents: function() {
		var me = this;

		Ext.getDoc().on('keyup', function(e, target) {
			if (e.ctrlKey && e.shiftKey) {
				switch (e.getKey()) {
					case 70:
						me.openFastFindMenu();
						e.stopEvent();
						break;
					case 76:
						me.closeAllTabs();
						e.stopEvent();
						break;
					default:
						break;
				}
			}
		});
	},

	closeAllTabs: function() {
		var me = this,
			tabs = Ext.getCmp('tabs');

		tabs.plugins[0].doClose(false);
	},

	restoreTabs: function(store) {
		var me = this,
			records,
			params,
			urlParams = Ext.Object.fromQueryString(window.location.search),
			pids = urlParams.pids,
			activeId = urlParams.active;

		if (pids) {
			params = me.getParamsByUrl();
			records = me.getRecordsByPid(store, pids);

			me.loadMultiplePage(records, params, 0, function() {
				me.setTabActive(activeId, params);

				if (!me.popstateChange) {
					me.updateUrlParams('active', activeId);
					me.popstateChange = false;
				}
			});
		}
	},

	loadMultiplePage: function(records, params, index, callback) {
		var me = this;

		if (index < records.length) {
			me.loadPage(records[index], params, function() {
				index++;
				me.loadMultiplePage(records, params, index, callback);
			});
		} else {
			if (Ext.isFunction(callback)) {
				callback();
			}
		}
	},

	openFastFindMenu: function() {
		if (this.menuDialog && !this.menuDialog.hidden) return;

		var me = this,
			size = Ext.getBody().getViewSize(),
			x = (size.width - 450) / 2,
			store = me.getMasterNavigationTreeStore();

		me.menuDialog = Ext.create('App.view.master.FastFindMenu', {
			animCollapse: true,
			treeStore: store
		});
		me.menuDialog.showAt(x, 10, 1000);
		me.bindFastMenuEvents();
	},

	bindFastMenuEvents: function() {
		var me = this;

		me.menuDialog.on('selectRow', function(id) {
			window.setTimeout(function() {
				me.menuDialog.close();
			}, 5);
		});
		me.menuDialog.on('close', function() {

			me.menuDialog = null;
		});
	},

	loadPage: function(record, params, callback) {
		if (Ext.isString(record)) {
			var store = this.getMasterNavigationTreeStore();

			record = store.getNodeById(record);
		}

		if (!record.get('leaf')) return;

		var me = this,
			id = record.get('id'),
			text = record.get('text'),
			url = record.get('url');

		if (Ext.isString(url) && url.length > 0) {
			me.openWindow(url);
			return;
		}

		if (me.getTabPage(record)) {
			me.addTab(id, text, true, record, params, callback);
		} else {
			if (console && console.log) {
				console.log("未配置page 信息, 请到extjsConfig 配置controller view, id:" + id);
			}
		}
	},

	addTab: function(id, title, closable, record, params, callback) {
		var me = this,
			viewport,
			tabs = Ext.getCmp('tabs'),
			tab = Ext.getCmp("tab_" + id);

		// 更新PID
		me.updateUrlPids(id.toString());

		// 当前模块已经打开, 则激活
		if (tab) {
			tab.params = params;
			tabs.setActiveTab(tab);
			if (!me.popstateChange) {
				me.updateUrlParams('active', id);
				me.popstateChange = false;
			}
			if (Ext.isFunction(callback)) {
				callback();
			}
			return;
		}

		// 快速打开菜单操作，闭包保留着用域
		(function(tabs, id, title, closable, record, params, callback) {

			window.setTimeout(function() {
				me.showTab(tabs, id, title, closable, record, params, callback);
			}, 5);

		})(tabs, id, title, closable, record, params, callback);
	},

	showTab: function(tabs, id, title, closable, record, params, callback) {
		var me = this;

		tabs.add({
			title: title,
			id: "tab_" + id,
			pid: id,
			items: [],
			layout: "fit",
			closable: closable,
			closeAction: "destroy",
			listeners: {
				afterrender: function() {
					var tab = this;

					tabs.setActiveTab(tab);
					me.updateUrlParams('active', id);
					me.finishTabRender(id, tab, record, params, callback);
				}
			},
			tabConfig: {
				pid: id,
				listeners: {
					click: function(tab) {
						me.updateUrlParams('active', tab.pid);
					}
				}
			}

		}).show();
	},

	finishTabRender: function(id, tab, record, params, callback) {
		var me = this,
			pageConfig = me.getTabPage(record || id);

		tab.setLoading(tab.title + ', 加载中...');

		setTimeout(function() {
			me.loadController(pageConfig, tab, record, params, callback);
		}, 10);
	},

	loadController: function(pageConfig, tab, record, params, callback) {
		var me = this;
		var controllerName = pageConfig.controller;
		var viewport = me.createViewport(pageConfig);
		var controllerClassName = App.app.getModuleClassName(controllerName, "controller");

		Ext.require(controllerClassName, function() {
			var controller = me.createController(controllerName);

			viewport.params = params;

			controller.viewportId = viewport.id;
			controller.functionCode = record ? record.get('functionCode') : null;
			controller.initEvents && controller.initEvents();

			tab.controllerId = controller.id;
			tab.add(viewport);
			tab.setLoading(false);

			if (Ext.isFunction(callback)) {
				callback();
			}
		});
	},

	createViewport: function(pageConfig) {
		var me = this,
			className = App.app.getModuleClassName(pageConfig.viewport, "view"),
			viewport = Ext.create(className, {
				id: Ext.id()
			});

		return viewport;
	},

	createController: function(controllerName) {
		var me = this;

		return App.app.getController(controllerName);
	},

	destroyController: function(controllerId) {
		var me = this;

		App.app.eventbus.unlisten(controllerId);
		App.app.controllers.remove({
			id: controllerId
		});
	},

	openWindow: function(url) {
		var me = this;

		window.open(url, "_blank");
	},

	setTabActive: function(pid, params) {
		var me = this,
			tabs = Ext.getCmp('tabs'),
			tab = Ext.getCmp("tab_" + pid);

		if (tab) {
			tab.params = params;
			tabs.setActiveTab(tab);
		}
	},

	closeTab: function(tab) {
		var me = this,
			pid = tab.pid.toString(),
			tabs = Ext.getCmp('tabs');

		window.setTimeout(function() {
			var pid = tab.pid.toString(),
				activePid = tabs.activeTab.pid;

			me.removeUrlPid(pid);
			me.updateUrlParams('active', activePid);
		}, 50)

		me.destroyController(tab.controllerId);
	},

	getTabPage: function(record) {
		var id = Ext.isString(record) ? record : record.get('id');

		return App.extjsConfig.pages[id];
	},

	getRecordsByPid: function(store, pids) {
		var me = this,
			records = [],
			arrPids = pids.split('-');

		Ext.each(arrPids, function(id) {
			var record = store.getNodeById(id);

			if (record) {
				records.push(record);
			}
		});

		return records;
	},

	getParamsByUrl: function() {
		var me = this,
			params = {},
			urlParams = Ext.Object.fromQueryString(window.location.search);

		for (var key in urlParams) {
			if (key === 'pid') continue;

			params[key] = urlParams[key];
		}

		return params;
	},

	removeUrlPid: function(pid) {
		var me = this,
			arrPids, startIndex,
			urlParams = Ext.Object.fromQueryString(window.location.search),
			pids = urlParams.pids;

		if (pids) {
			arrPids = pids.split('-');
			startIndex = arrPids.indexOf(pid);
			if (startIndex > -1) {
				arrPids.splice(startIndex, 1);
				me.updateUrlParams('pids', arrPids.join('-'));
			}
		}
	},

	updateUrlPids: function(pid) {
		var me = this,
			arrPids,
			urlParams = Ext.Object.fromQueryString(window.location.search),
			pids = urlParams.pids;

		if (pids) {
			arrPids = pids.split('-');
			if (Ext.Array.indexOf(arrPids, pid.toString()) === -1) {
				arrPids.push(pid);
				me.updateUrlParams('pids', arrPids.join('-'));
			}
		} else {
			me.updateUrlParams('pids', pid);
		}
	},

	updateUrlParams: function(params, value) {
		var me = this,
			newUrl,
			urlParams = Ext.Object.fromQueryString(window.location.search),
			href = window.location.href,
			regExp = new RegExp(params + "(.+?)(&|$)", "g");

		if (params in urlParams) {
			newUrl = href.replace(regExp, params + "=" + value + "$2");
		} else {
			if (href.indexOf('?') > -1) {
				newUrl = href + '&' + params + '=' + value;
			} else {
				newUrl = href + '?' + params + '=' + value;
			}
		}

		if (window.history.pushState) {
			window.history.pushState("", "", newUrl);
		}
	}
});