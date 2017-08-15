<!-- permisson config -->
<script type="text/javascript">
    var App = App || {};

    App.permissonConfig = {
        result:  (function(){
            var data=[${permissions}].length > 0? [${permissions}][0] : [] ;

            if (data && data.length > 0){
                return data;
            } else {
                return [];
            }
        })(),
        hasOperation: function(name){
            var me =  this, i= 0;

            if (Ext.isString(name)){
                return Ext.Array.contains(me.result, name); 
            }
            if (Ext.isArray(name)){
                for (; i< name.length; i++){
                    if (Ext.Array.contains(me.result, name[i])){
                        return true;
                    }
                }
            }
            return false;
        }
    };

</script>
