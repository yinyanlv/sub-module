Ext.define('Ext.ux.component.svg.SvgHotpoint', {
	extend: 'Ext.ux.component.svg.SvgDragZoom',
	alias: 'widget.svghotpoint',

	finishLoaded: function() {
		var me = this;

		this.callParent(arguments);

		me.texts = me.getTexts();
		me.setCalloutOriginalPosition();
		me.addEvents();
	},

	setCalloutOriginalPosition: function() {
		var me = this;

		me.texts.each(function() {
			var item = Snap(this),
				matrix = item.transform().localMatrix.toString();

			Ext.fly(item.node).setStyle("cursor", "pointer");
			item.data("data-matrix", matrix);
			item.data("data-bbox", item.getBBox());
		});
	},

	activeCallout: function(callouts) {
		var me = this,
			texts = me.getCalloutTexts(callouts);

		if (texts.length && texts.length > 0) {
			me.highlightCallout(texts);
			me.calloutIntoView(texts);
		}
	},

	calloutIntoView: function(texts) {
		var me = this,
			isVisible = me.getCalloutVisible(texts),
			scale = me.zoomScale.scale(),
			degree = me.degree;

		if (!isVisible) {
			if (texts.length > 1 || scale === 1 || degree !== 0) {
				me.resetTSR(me.viewport);
				me.resetCalloutDegree();
			} else {
				me.calloutMoveCenter(texts.node());
			}
		}
	},

	calloutMoveCenter: function(item) {
		var me = this;

		me.setElToCenter(item);
	},

	getCalloutVisible: function(texts) {
		var me = this,
			isVisible = true,
			clientSize = me.svg.node().getBoundingClientRect(),
			scale = me.zoomScale.scale(),
			minLeft = (scale * 10) / 2,
			minTop = (scale * 10) / 2,
			maxLeftRange = clientSize.width - (10 * scale) / 2,
			maxTopRange = clientSize.height - (10 * scale) / 2;

		texts.each(function() {
			var itemSize = me.getNodeSize(this);
			if ((itemSize.x < minLeft || itemSize.y < minTop) || (itemSize.x > maxLeftRange || itemSize.y > maxTopRange)) {
				isVisible = false;
				return false;
			}
		});

		return isVisible;
	},

	getNodeSize: function(node) {
		var me = this,
			bbox = node.getBBox(),
			ctm = node.getCTM(),
			nodeClientRect = node.getBoundingClientRect(),
			svgClientRect = me.svg.node().getBoundingClientRect();

		return {
			x: nodeClientRect.left - svgClientRect.left,
			y: nodeClientRect.top - svgClientRect.top,
			width: bbox.width,
			height: bbox.height,
			scale: ctm.a
		};
	},

	getTexts: function(callout) {
		var me = this,
			texts = me.svg
			.selectAll("text")
			.filter(function() {
				return /^\w{1,3}$/.test(this.textContent);
			});

		return texts;
	},

	addEvents: function() {
		var me = this;

		me.texts.on({
			"click": function() {
				me.selectionCallout(this);
			},
			"touchstart": function() {
				me.selectionCallout(this);
			},
			"mouseover": function(e) {
				me.calloutIn(this, e);
			},
			"mouseout": function(e) {
				me.calloutOut(this, e);
			}
		});
	},

	rotate: function(el, delta) {
		this.callParent(arguments);
		this.setCalloutDegree(this.degree);
	},

	resetTSR: function() {
		this.callParent(arguments);
		this.resetCalloutDegree();
	},

	resetCalloutDegree: function() {
		var me = this;

		if (!me.texts) return;

		me.texts.each(function() {
			var item = Snap(this),
				matrix = item.data("data-matrix");

			item.animate({
				x: 0,
				y: 0
			}, 0);
			item.animate({
				transform: matrix
			}, 0);
		});
	},

	setCalloutDegree: function(degree) {
		var me = this;

		me.texts.each(function() {
			var item = Snap(this),
				bbox = item.data("data-bbox");

			item.animate({
				x: bbox.x,
				y: (bbox.y + 12)
			}, 0);
			item.animate({
				transform: "r" + (degree > 0 ? -degree : Math.abs(degree)) + ", " + bbox.cx + ", " + bbox.cy
			}, 0);
		});
	},

	selectionCallout: function(target) {
		var me = this,
			callout = target.textContent,
			texts = me.getCalloutTexts([callout]);

		me.highlightCallout(texts);

		me.fireEvent('activecallout', callout);
	},

	calloutIn: function(target) {
		var me = this,
			flag = "temp",
			stroke = "#FFDD02",
			callout = target.textContent;

		me.appendCircle(target, stroke, flag);
	},

	calloutOut: function() {
		var me = this,
			flag = "temp";

		me.removeCircle(flag);
	},

	createCircle: function(cx, cy, stroke, flag) {
		var r = 18,
			circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

		circle.setAttribute("flag", flag);
		circle.setAttribute("cx", cx);
		circle.setAttribute("cy", cy);
		circle.setAttribute("r", r);
		circle.setAttribute("stroke", stroke);
		circle.setAttribute("stroke-width", 3);
		circle.setAttribute("fill", "none");

		return circle;
	},

	getCalloutTexts: function(callouts) {
		var me = this,
			texts = me.texts.filter(function() {
				var callout = this.textContent;

				return callouts.indexOf(callout) > -1;
			});

		return texts;
	},

	highlightCallout: function(texts) {
		var me = this,
			stroke = "#E30A0A",
			flag = "selected";

		me.removeCircle(flag);

		texts.each(function() {
			me.appendCircle(this, stroke, flag);
		});
	},

	appendCircle: function(target, stroke, flag) {
		var me = this,
			bbox = Snap(target).getBBox(),
			circle = me.createCircle(bbox.cx, bbox.cy, stroke, flag);

		me.viewport.node().appendChild(circle);
	},

	removeCircle: function(flag) {
		var me = this;

		me.viewport.select('circle[flag="' + flag + '"]').remove();
	}
});