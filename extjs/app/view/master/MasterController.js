Ext.define('App.view.master.MasterController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.master',

	isMicro: false,

	onViewportRender: function() {
		var me = this,
			refs = me.getReferences(),
			status = me.getNavStatus();

		me.bindShortcurKeyEvents();
		me.adjustNavigationScroller();
		me.switchArrow(status);
		me.isMicro = status;
		me.setToolstripStatus(!status);
	},

	onUserInfoClick: function(target, e) {
		var me = this;

		me.userClick(e);
	},

	onTreeListItemClick: function() {
		var me = this;

		me.adjustFloatNavigationScroller();
	},

	onTreeListLoaded: function() {
		var me = this;

		me.bindTreeItemEvents();
		me.bindTreeMenuData();
	},

	onSearchBoxClear: function(field) {
		var me = this;

		field.setValue('');
		me.toggleMenuListVisible(field)
	},

	bindTreeItemEvents: function() {
		var me = this,
			id,
			toolItems = Ext.query('#navigationTreeList .x-treelist-item-tool');

		for (var i = 0; i < toolItems.length; i++) {
			id = toolItems[i].id;

			Ext.get(id).on({
				'mouseenter': function() {
					setTimeout(function() {
						me.adjustFloatNavigationScroller();
					}, 30);
				}
			});
		}
	},

	bindTreeMenuData: function() {
		var me = this,
			refs = me.getReferences(),
			store = refs.treeList.getStore();

		refs.navMenuList.bindData(store);
	},

	bindShortcurKeyEvents: function() {
		var me = this;

		Ext.getDoc().on('keyup', function(e, target) {
			if (e.ctrlKey) {
				switch (e.getKey()) {
					case 81:
						me.setSearchBoxFocus();
						e.stopEvent();
						break;
					default:
						break;
				}
			}
			if (e.ctrlKey && e.shiftKey) {
				switch (e.getKey()) {
					case 37:
						me.isMicro = false;
						me.onToggleNavigationSize();
						e.stopEvent();
						break;
					case 39:
						me.isMicro = true;
						me.onToggleNavigationSize();
						e.stopEvent();
						break;
					default:
						break;
				}
			}
		});
	},

	onToggleNavigationSize: function() {
		var me = this,
			refs = me.getReferences(),
			collapsing = !me.isMicro,
			newWidth = collapsing ? 64 : 250;

		me.setNavigationWidth(newWidth);
		me.switchArrow(!me.isMicro);
		refs.mainContainerWrap.updateLayout({
			isRoot: true
		});

		if (collapsing) {
			me.setToolstripStatus(false);
		} else {
			me.setToolstripStatus(true)
		}

		me.isMicro = collapsing;
		refs.treeSearchWrap.setHidden(collapsing);

		if (collapsing) {
			refs.navMenuList.setHidden(true);
			refs.treeListWrap.setHidden(false);
			refs.treeSearchBox.setValue('');
		}

		Ext.util.Cookies.set('nav-status', collapsing);
	},

	onSearchMenuItem: function(field, e, eOpts) {
		var me = this;

		if (e.getKey() === 27) {
			field.setValue('');
		}
		me.toggleMenuListVisible(field)
		me.doMenuListFilter(field, e);
	},

	toggleMenuListVisible: function(field) {
		var me = this,
			refs = me.getReferences(),
			newValue = field.getValue();

		if (Ext.isEmpty(newValue)) {
			refs.treeListWrap.show();
			refs.navMenuList.hide();
			refs.treeSearchBox.triggers.clear.hide();
			refs.treeSearchBox.triggers.search.show();
		} else {
			refs.treeListWrap.hide();
			refs.navMenuList.show();
			refs.treeSearchBox.triggers.clear.show();
			refs.treeSearchBox.triggers.search.hide();
		}
	},

	doMenuListFilter: function(field, e) {
		var me = this,
			keyCode = e.getKey(),
			refs = me.getReferences(),
			grid = refs.navMenuList,
			newValue = field.getValue();

		switch (keyCode) {
			case 13:
				grid.selectMenuItem();
				break;
			case 40:
				grid.nextRowSelect();
				break;
			case 38:
				grid.prevRowSelect();
				break;
			default:
				grid.filterItmes(newValue);
				break;
		}
	},

	setSearchBoxFocus: function() {
		var me = this,
			refs = me.getReferences();

		refs.treeSearchBox.focus();
	},

	setNavigationWidth: function(newWidth) {
		var me = this,
			refs = me.getReferences();

		refs.senchaLogo.animate({
			dynamic: true,
			to: {
				width: newWidth
			}
		});

		refs.navigationWrap.width = newWidth;
	},

	switchArrow: function(direction) {
		var me = this,
			btnNav = Ext.getCmp('main-navigation-btn');

		if (direction) {
			btnNav.setIconCls("iconfont icon-expand-right");
		} else {
			btnNav.setIconCls("iconfont icon-collapse-left")
		}
	},

	setToolstripStatus: function(isShow) {
		var me = this,
			body = Ext.getBody();

		if (isShow) {
			body.removeCls('nav-collapsing');
		} else {
			body.addCls('nav-collapsing');
		}
	},

	adjustNavigationScroller: function() {
		var self = this;

		setTimeout(function() {
			var treelistDom = document.getElementById('navigationTreeList');

			treelistDom.style.height = (document.documentElement.offsetHeight - 90) + 'px';
			fleXenv.fleXcrollMain(treelistDom);

			Ext.getBody().on({
				'click': function() {
					setTimeout(function() {
						treelistDom.fleXcroll.updateScrollBars();
					}, 500);
				}
			});

			Ext.get(window).on('resize', function() {
				setTimeout(function() {
					treelistDom.style.height = (document.documentElement.offsetHeight - 90) + 'px';
					treelistDom.fleXcroll.updateScrollBars();
				}, 500);
			});

		}, 30);
	},

	adjustFloatNavigationScroller: function() {
		var floatNavWrapper = Ext.query('body > .x-treelist-navigation', document.body);
		var floatItemsWrapper = Ext.query('body > .x-treelist-navigation .x-autocontainer-innerCt', document.body);

		if (floatNavWrapper[0]) {
			setTimeout(function() {
				var treelistDom = floatNavWrapper[0];
				var height = floatItemsWrapper[0].clientHeight;

				if (height > 600) {
					treelistDom.style.height = '600px';
					fleXenv.fleXcrollMain(treelistDom);
				} else {
					if (treelistDom.fleXcroll) {
						treelistDom.style.height = height + 'px';
						treelistDom.fleXcroll.updateScrollBars();
					}
				}
			}, 300);
		}
	},

	userClick: function(e) {
		var me = this,
			headerUser = Ext.get("header_user");

		if (headerUser) {
			if (headerUser.isVisible()) {
				headerUser.fadeOut();
				Ext.fly("user_info").down(".icon-caret").addCls("fa-caret-down").removeCls("fa-caret-up");
			} else {
				headerUser.fadeIn();
				Ext.fly("user_info").down(".icon-caret").addCls("fa-caret-up").removeCls("fa-caret-down");
			}
		} else {
			headerUser = Ext.get("header_user_template").getHtml();
			Ext.dom.Helper.append(Ext.getBody(), headerUser);
			Ext.fly("header_user").show();
			Ext.fly("header_title").down(".icon-caret").addCls("fa-caret-up").removeCls("fa-caret-down");

			me.initHeaderEvents();
		}

		e.stopEvent();
	},

	initHeaderEvents: function() {
		var me = this,
			btnLogOut = Ext.query("[data-field='log-out']")[0],
			doc = Ext.getDoc();

		Ext.get(btnLogOut).on("click", function(e) {
			me.logoutSys();
		});

		doc.on("click", function(e) {
			if (Ext.fly(e.target).up("#header_user") !== Ext.fly("header_user")) {
				Ext.fly("header_user").fadeOut();
				Ext.fly("user_info").down(".icon-caret").addCls("fa-caret-down").removeCls("fa-caret-up");
			}
		});
	},

	showChangePassword: function() {
		var me = this,
			changePwdWindow = Ext.create('App.view.account.changePassword.Form');

		changePwdWindow.show();
	},

	logoutSys: function() {
		var me = this;

		Ext.Msg.confirm('提示', '您确认退出系统?', function(btn) {
			if (btn === 'yes') {
				Ext.util.Common.ajax({
					url: App.globalConfig.path + '/login/logoff',
					method: 'GET',
					disableCaching: true,
					success: function(res) {
						window.location.href = App.globalConfig.path + '/login';
					},
					failure: function(res) {
						Ext.Msg.alert('提示', res.message);
					}
				});
			}
		});
	},

	getNavStatus: function() {
		var me = this,
			status = (Ext.util.Cookies.get('nav-status') == 'true');

		return status;
	}
});