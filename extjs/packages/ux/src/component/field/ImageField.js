Ext.define('Ext.ux.component.field.ImageField', {
	extend: 'Ext.form.field.Base',
	alias: 'widget.imagefield',
	isOpenView: true,
	viewBig: false,
	fieldSubTpl: ['<img style="width:100%;height:100%;" id="{id}" class="{fieldCls}" />', {
		compiled: true,
		disableFormats: true
	}],
	fieldCls: Ext.baseCSSPrefix + 'form-image-field',
	url: null,
	cdnPath: null,
	value: null,
	noImgFile: null,
	error: true,
	nopicPath: '',
	boxWidth: 0,
	boxHeight: 0,

	listeners: {
		afterrender: function() {
			if (!this.viewBig) {
				this.inputEl.setStyle('height', this.boxHeight + 'px');
			}
		}
	},

	initEvents: function() {
		this.callParent();

		this.inputEl.on('click', this.doClick, this);
	},

	doClick: function(e, o) {

		this.fireEvent('click', this, e);
	},

	onRender: function() {
		this.callParent(arguments);

		var me = this,
			name = me.name || Ext.id();

		me.hiddenField = me.inputEl.insertSibling({
			tag: 'input',
			type: 'hidden',
			name: name
		});

		me.error = true;
		me.loadImage();
	},

	loadImage: function() {
		var me = this,
			img = Ext.get(new Image());

		img.on('load', function() {
			me.imageLoaded(this);
		}, img.dom, {
			single: true
		});

		img.on('error', function() {
			me.error = true;
			me.loadNoImage();
		}, img.dom, {
			single: true
		});

		if (me.value || me.url) {
			img.set({
				src: me.url ? me.url : me.cdnPath + '/' + me.value
			});
		} else {
			me.loadNoImage();
		}
	},

	imageLoaded: function(img) {
		var me = this;

		me.error = false;

		if (me.viewBig) {
			me.buildBigImage(img);
		} else {
			me.buildSmallImage(img);
		}

		if (me.isViewBagImage()) {
			me.setCursor();
		}
	},

	buildBigImage: function(img) {
		var me = this,
			parentSize = me.up().getSize(),
			parentElement = me.el.dom.parentElement.parentElement,
			scalingSize = me.scalingDownCalc(img.width, img.height, parentSize.width, parentSize.height);

		me.setSize({
			width: scalingSize.width,
			height: scalingSize.height
		});
		me.inputEl.setStyle({
			width: scalingSize.width + 'px',
			height: scalingSize.height + 'px'
		});

		Ext.fly(me.inputEl.el.dom.parentElement).setStyle('text-align', 'center');
		Ext.fly(parentElement).setTop(scalingSize.top);

		me.setSrc(img.src);
	},

	buildSmallImage: function(img) {
		var me = this,
			scalingSize = me.scalingDownCalc(img.width, img.height, me.boxWidth, me.boxHeight);

		me.setSize({
			width: scalingSize.width,
			height: scalingSize.height
		});

		me.setSrc(img.src);
	},

	loadNoImage: function() {
		var me = this,
			parentSize = me.getParentSize(),
			img = Ext.get(new Image()),
			src = me.nopicPath + '/' + me.noImgFile;

		img.on('load', function() {
			var scalingSize = me.scalingDownCalc(this.width, this.height, parentSize.width, parentSize.height);

			me.inputEl.setStyle({
				width: scalingSize.width + 'px',
				height: scalingSize.height + 'px'
			});

			Ext.fly(me.inputEl.el.dom.parentElement).setStyle('text-align', 'center');

		}, img.dom, {
			single: true
		});

		img.set({
			src: src
		});

		me.setSrc(src);
	},

	getParentSize:function(){
		var me = this;

		if (me.viewBig){
			return me.up().getSize();
		} else {
			return {width: me.boxWidth, height:me.boxHeight};
		}
	},

	scalingDownCalc: function(iW, iH, mW, mH) {
		var newW, newH, top, left;

		if (iH / iW >= mH / mW) {
			if (iH > mH) {
				newH = mH;
				newW = (iW * mH) / iH;
			} else {
				newW = iW;
				newH = iH;
			}
		} else {
			if (iW > mW) {
				newW = mW;
				newH = (iH * mW) / iW;
			} else {
				newW = iW;
				newH = iH;
			}
		}

		top = (mH - newH) / 2;
		left = (mW - newW) / 2;

		return {
			width: newW,
			height: newH,
			top: top,
			left: left
		};
	},

	setSrc: function(src) {
		var me = this;

		me.inputEl.set({
			src: src
		});
	},

	isViewBagImage: function() {
		var me = this;

		if (!me.error && me.isOpenView) {
			return true;
		}

		return false;
	},

	setCursor: function() {
		var me = this;

		me.inputEl.setStyle('cursor', 'pointer');
	}
});