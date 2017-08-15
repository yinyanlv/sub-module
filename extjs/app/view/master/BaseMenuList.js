Ext.define('App.view.master.BaseMenuList', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.masterbasemenulist',

	initEvents: function() {
		var me = this;

		me.view.addElListener('keyup', function(e, target) {
			if (e.getKey() === e.ENTER) {
				me.selectMenuItem();
			}
		});
		me.on('rowclick', function(e, target) {
			me.selectMenuItem();
		});

		this.callParent(arguments);
	},

	bindData: function(treeStore) {
		var me = this,
			gridStore = me.getStore(),
			data = me.getPlaneData(treeStore);

		gridStore.loadData(data);
		me.getSelectionModel().select(0);
	},

	prevRowSelect: function() {
		var me = this,
			store = me.getStore(),
			selectionModel = me.getSelectionModel(),
			curPosition = selectionModel.getCurrentPosition();

		if (store.getCount() > 1) {
			selectionModel.selectPrevious(true);
			me.getView().scrollRowIntoView(curPosition.rowIdx - 1);
		}
	},

	nextRowSelect: function() {
		var me = this,
			store = me.getStore(),
			selectionModel = me.getSelectionModel(),
			curPosition = selectionModel.getCurrentPosition();

		if (store.getCount() > 1) {
			selectionModel.selectNext(true);
			me.getView().scrollRowIntoView(curPosition.rowIdx + 1);
		}
	},

	selectMenuItem: function() {
		var me = this,
			records = me.getSelectionModel().getSelection();

		if (records.length) {
			me.fireEvent('selectRow', records[0].get('id'));
		}
	},

	filterItmes: function(val) {
		var me = this,
			matchKeyWord,
			store = me.getStore(),
			newValue = me.getMatchKeyWord(val);

		me.keyword = newValue || '';

		store.clearFilter();

		if (!Ext.isEmpty(val)) {
			store.filterBy(function(record, id) {
				var py = record.get('py'),
					text = record.get('text'),
					pingyin = record.get('pingyin'),
					pingyins = record.get('pingyin'),
					pattern = new RegExp(newValue.toUpperCase(), 'g'),
					pattern2 = new RegExp(newValue, 'gi');

				if (pattern.test(text) || pattern.test(py)) {
					return true;
				}
				if (newValue.length > 1 && pattern2.test(pingyin)) {
					return true;
				}
			});
		}
		if (store.getCount() > 0) {
			me.getSelectionModel().select(0);
		}
	},

	getMatchKeyWord: function(val) {
		var me = this,
			keyword = Ext.util.Format.trim(val);

		return keyword;
	},

	getPlaneData: function(treeStore) {
		var me = this,
			items = [],
			rootNode = treeStore.getRootNode();

		rootNode.cascadeBy(function(curNode) {
			if (curNode.get('leaf')) {
				items.push({
					id: curNode.get('id'),
					text: curNode.get('text'),
					py: curNode.get('py'),
					pingyin: curNode.get('pingyin'),
					pingyins: curNode.get('pingyins'),
					path: me.getPathName(curNode)
				});
			}
		});

		return items;
	},

	getPathName: function(node) {
		var me = this,
			paths = [];

		node.bubble(function(curNode) {
			var text = curNode.get('text');

			if (curNode.isRoot()) return;

			paths.push(text)
		});

		return paths.reverse().join('\\');
	},

	getHighlightHtml: function(value, record) {
		var me = this,
			words,
			py = record.get('py'),
			keyword = this.keyword || '',
			pingyins = record.get('pingyins');

		if (value.indexOf(keyword) > -1) {
			return value.replace(keyword, '<span style="color:#00BCBC;">' + keyword + '</span>');
		} else {
			words = me.getWordsByPy(keyword, value, py);

			if (keyword.length > 1 && 　words.length === 0) {
				words = me.getWordsByPingyin(keyword, value, pingyins);
			}
			if (words.length) {
				Ext.each(words, function(word) {
					value = value.replace(new RegExp(word, "g"), '<span style="color:#00bcbc;">' + word + '</span>');
				});
				return value;
			}
		}

		return value;
	},

	getWordsByPy: function(keyword, text, py) {
		var me = this,
			words = [],
			indexs = me.findAllIndex(py, keyword);

		Ext.each(indexs, function(idx) {
			words.push(text.substr(idx, keyword.length));
		});

		return words;
	},

	getWordsByPingyin: function(keyword, text, pingyins) {
		var me = this,
			words = [],
			indexs = me.findWordAllIndex(keyword, pingyins);

		Ext.each(indexs, function(idx) {
			words.push(text.substr(idx, 1));
		});

		return words;
	},

	findAllIndex: function(str, x) {
		var results = [],
			len = str.length,
			pos = 0;

		while (pos < len) {
			pos = str.indexOf(x.toUpperCase(), pos);
			if (pos === -1) {
				break;
			}
			results.push(pos);
			pos += 1;
		}

		return results;
	},

	findWordAllIndex: function(keyword, pingyins) {
		var me = this,
			s = '',
			results = [];

		keyword = keyword.toUpperCase();

		for (var i = 0; i < pingyins.length; i++) {
			s = '';
			for (var j = 0; j < pingyins[i].length; j++) {
				s = s + pingyins[i][j];
				if (s.length > 1 && keyword.indexOf(s) > -1) {
					results.push(i);
					break;
				}
			}
		}

		return results;
	}
});