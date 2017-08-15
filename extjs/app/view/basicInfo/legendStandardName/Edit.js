Ext.define('App.view.basicInfo.legendStandardName.Edit', {
    extend: 'Ext.ux.component.edit.Edit',
    title: '图例标准名称',
    updateDisableItems: ['code'],
    items: [{
        items: [{
            fieldLabel: '图例标准名称编码',
            name: 'code',
            maxLength: 50
        }, {
            fieldLabel: '图例标准中文名称',
            name: 'nameZh',
            maxLength: 200
        }, {
            fieldLabel: '图例标准英文名称',
            name: 'nameEn',
            allowBlank: true,
            maxLength: 200
        }]
    }]
});