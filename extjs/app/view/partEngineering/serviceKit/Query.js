Ext.define('App.view.partEngineering.serviceKit.Query', { 
    extend: 'Ext.ux.component.filter.Query', 
    alias: 'widget.servicekitquery', 
    items: [{ 
        items: [{ 
            fieldLabel: '维修包编码', 
            name: 'code' 
        }, { 
            fieldLabel: '维修包名称', 
            name: 'name' 
        }, { 
            fieldLabel: '父配件编码', 
            name: 'parentPartCode' 
        }, { 
            fieldLabel: '父配件名称', 
            name: 'parentPartName' 
        }, { 
            fieldLabel: '维修包备注', 
            name: 'note' 
        }, { 
            xtype: 'datefield', 
            fieldLabel: '创建时间-起', 
            name: 'createdDate_S', 
            format: 'Y-m-d' 
        }, { 
            xtype: 'datefield', 
            fieldLabel: '创建时间-止', 
            name: 'createdDate_E', 
            format: 'Y-m-d' 
        }] 
    }] 
});