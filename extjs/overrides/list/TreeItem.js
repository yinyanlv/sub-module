Ext.define('App.list.TreeItem', {
    override: 'Ext.list.TreeItem',

    updateNode: function (node) {
        var qtip = node && node.get('qtip');

        this.callParent(arguments);
        qtip && this.element.dom.setAttribute('data-qtip', qtip);
    }
});