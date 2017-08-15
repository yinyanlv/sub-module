Ext.define('Ext.ux.component.svg.SvgDragZoom', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.svgdragzoom',

	//自定义属性
	degree: 0,
	nopicPath: '',

	listeners: {
		afterrender: function() {
			this.setLegendWrapStyles();
			this.createTools();
			this.loadDefaultImg();
		}
	},

	setLegendWrapStyles: function() {
		var me = this,
			innerCt = this.el.query('[data-ref="innerCt"]'),
			legendWrap = Ext.fly(innerCt[0]);

		legendWrap.setStyle({
			width: '100%',
			height: '100%',
			position: 'absolute'
		});
	},

	createTools: function() {
		var me = this,
			tpl = me.getToolsTpl(),
			innerCt = me.el.query('[data-ref="innerCt"]');

		Ext.fly(innerCt[0]).update(tpl);
	},

	loadSVG: function(url) {
		var me = this;

		me.abordXhr();
		me.setLoading(true);

		window.setTimeout(function() {
			me.removeDefaultImg();
			me.removeSvgTag();
			me.xhr = d3.text(url, function(error, xmlStr) {
				if (error === null && me.isSVG(xmlStr)) {
					me.finishLoaded(xmlStr);
				} else {
					me.loadDefaultImg();
				}
				me.xhr = null;
				me.setLoading(false);
			});
		}, 1);
	},

	finishLoaded: function(xmlStr) {
		var me = this;

		me.buildSVG(xmlStr);
		me.addToolsEvents();
		me.addSvgEvents();
		me.resetTSR(me.viewport);
		me.fireEvent('svgloaded');
	},

	buildSVG: function(xmlStr) {
		var me = this,
			tpl = me.getToolsTpl(),
			innerCt = me.el.query('[data-ref="innerCt"]'),
			svgTagStr = xmlStr.match(/<svg[^>]*>/i),
			svgTagInnerContent = xmlStr.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i),
			newXmlStr = svgTagStr + '<g>' + svgTagInnerContent[1] + ' </g> </svg>';

		Ext.fly(innerCt[0]).update(tpl + ' ' + newXmlStr);
		me.svg = d3.select(me.el.query('svg')[0]);
		me.svg.style({
			width: '100%',
			height: '100%'
		});
		me.viewport = me.svg.select("g");
	},

	addToolsEvents: function() {
		var me = this,
			buttons = me.el.query('[data-action]');

		Ext.each(buttons, function(item) {
			Ext.get(item).on('click', function(e, target) {
				var el = me.viewport,
					action = Ext.fly(target).getAttribute('data-action');

				switch (action) {
					case "zoomin":
						me.zoomIn(el);
						break;
					case "zoomout":
						me.zoomOut(el);
						break;
					case "reset":
						me.resetTSR(el);
						break;
					case "leftrotate":
						me.rotate(el, 0);
						break;
					case "rightrotate":
						me.rotate(el, 1);
						break;
					default:
						break;
				}
			});
		});
	},

	addSvgEvents: function() {
		var me = this,
			svgNode = me.svg.node;

		me.zoomScale = d3.behavior.zoom().scaleExtent([0.5, 10]);
		me.svg.call(me.zoomScale);
		me.zoomScale.on("zoom", function() {
			me.zoom(me.viewport);
		});
	},

	loadDefaultImg: function() {
		var me = this,
			innerCt = me.el.query('[data-ref="innerCt"]');

		Ext.fly(innerCt[0]).setStyle('background', 'url(' + me.nopicPath + ') no-repeat center center');
		me.disableTools(true);
	},

	removeDefaultImg: function() {
		var me = this,
			innerCt = me.el.query('[data-ref="innerCt"]');

		Ext.fly(innerCt[0]).setStyle('background', 'none');
	},

	abordXhr: function() {
		var me = this;

		if (me.xhr) {
			me.setLoading(true);
			me.xhr.abort();
		}
	},

	zoom: function(el) {
		var me = this,
			rotate = me.degree,
			scale = d3.event ? d3.event.scale : me.zoomScale.scale(),
			translate = d3.event ? d3.event.translate : me.zoomScale.translate();

		me.setTSR(el, translate, scale, rotate);
	},

	zoomIn: function(el) {
		if (this.zoomScale.scale() + 0.2 > 10) {
			return;
		}
		var me = this,
			degree = me.degree,
			scale = me.zoomScale.scale() + 0.2,
			localMatrix = me.getLocalMatrix(el, scale, degree);

		me.zoomScale.scale(scale);
		me.zoomScale.translate([localMatrix.e, localMatrix.f]);
		me.zoom(el);
	},

	zoomOut: function(el) {
		if (this.zoomScale.scale() - 0.2 < 0.5) {
			return;
		}
		var me = this,
			degree = me.degree,
			scale = me.zoomScale.scale() - 0.2,
			localMatrix = me.getLocalMatrix(el, scale, degree);

		me.zoomScale.scale(scale);
		me.zoomScale.translate([localMatrix.e, localMatrix.f]);
		me.zoom(el);
	},

	setTSR: function(el, translate, scale, rotate) {
		el.transition()
			.duration(0)
			.attr('transform', "translate(" + translate + ")scale(" + scale + ")rotate(" + rotate + ")");
	},

	rotate: function(el, delta) {
		var me = this,
			degree = me.degree,
			scale = me.zoomScale.scale(),
			degree = (delta === 1 ? degree + 30 : degree - 30),
			localMatrix = me.getLocalMatrix(el, scale, degree);

		me.setTSR(el, [localMatrix.e, localMatrix.f], scale, degree);
		me.zoomScale.translate([localMatrix.e, localMatrix.f]);
		me.degree = degree;
	},

	getLocalMatrix: function(el, scale, degree) {
		var me = this,
			bbox = el.node().getBBox(),
			translate = {
				cx: bbox.width / 2,
				cy: bbox.height / 2,
				dx: (bbox.width - bbox.width * scale) / 2,
				dy: (bbox.height - bbox.height * scale) / 2
			},
			matrix = new Snap.Matrix(scale, 0, 0, scale, translate.dx, translate.dy),
			localMatrix = matrix.rotate(degree, translate.cx, translate.cy);

		return localMatrix;
	},

	resetTSR: function(el) {
		var me = this;

		me.setTSR(el, [0, 0], 1, 0);
		me.zoomScale.scale(1);
		me.zoomScale.translate([0, 0]);
		me.degree = 0;
	},

	setElToCenter: function(target) {
		var me = this,
			el = me.viewport,
			svgNode = me.svg.node(),
			portMargin = me.getPortMargin(svgNode),
			portCTM = el.node().getCTM(),
			targetCTM = target.getCTM(),
			scale = me.zoomScale.scale(),
			degree = me.degree,
			mLeft = targetCTM.e - portCTM.e,
			mTop = targetCTM.f - portCTM.f,
			clientSize = svgNode.getBoundingClientRect(),
			translate = [
				((clientSize.width / 2 - portMargin.left - mLeft) / portCTM.a) * scale, ((clientSize.height / 2 - portMargin.top - mTop) / portCTM.a) * scale
			];

		me.setTSR(el, translate, scale, degree);
		me.zoomScale.translate(translate);
	},

	getPortMargin: function(node) {
		var me = this,
			screenCTM;

		if (node.getCTM()) {
			return {
				left: node.getCTM().e,
				top: node.getCTM().f
			}
		} else {
			screenCTM = node.getScreenCTM();
			return {
				left: screenCTM.e - $(node).offset().left,
				top: screenCTM.f - $(node).offset().top
			}
		}
	},

	removeSvgTag: function() {
		var me = this;

		me.el.select("svg").remove();
	},

	getScale: function() {
		var me = this;

		return me.zoomScale.scale();
	},

	getRotate: function() {
		var me = this;

		return me.degree;
	},

	isSVG: function(xmlStr) {
		var me = this;

		return xmlStr.match(/<svg[^>]*>/i) ? true : false;
	},

	disableTools: function(disabled) {
		var me = this,
			buttons = me.el.select('[data-action]');

		if (disabled) {
			buttons.addCls('disabled');
		} else {
			buttons.removeCls('disabled');
		}
	},

	getToolsTpl: function() {
		var me = this,
			html = '<div class="assistive-tool">' +
			'<a data-action="zoomin" class="assistive-tool-zoomin"></a>' +
			'<a data-action="zoomout" class="assistive-tool-zoomout"></a>' +
			'<a data-action="reset" class="assistive-tool-reset"></a>' +
			'<a data-action="rightrotate" class="assistive-tool-right-rotate"></a>' +
			'<a data-action="leftrotate" class="assistive-tool-left-rotate"></a>' +
			'</div>';

		return html;
	}
});