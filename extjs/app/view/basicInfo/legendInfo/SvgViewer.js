Ext.define("App.view.basicInfo.legendInfo.SvgViewer", {
    extend: 'Ext.window.Window',
    alias: 'widget.cmpimageview',
    requires: [
        'Ext.ux.component.svg.SvgDragZoom'
    ],
    title: '查看大图',
    width: 560,
    height: 578,
    closable: true,
    modal: true,
    resizable: false,
    constrainHeader: true,
    listeners: {
        afterrender: function() {
            this.loadSvg();
        }
    },

    loadSvg: function() {
        var me = this,
            svgDragZoom = me.down('svgdragzoom'),
            svgUrl = App.globalConfig.path + '/file/mapping?url=' + me.url;

        svgDragZoom.loadSVG(svgUrl);
    },

    items: [{
        xtype: 'svgdragzoom',
        height: 545,
        nopicPath: App.globalConfig.path + '/styles/images/no_img.png'
    }]
});