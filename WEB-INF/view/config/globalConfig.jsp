<script type="text/javascript">
    var App = App || {};

    App.globalConfig = {
        path: '${path}',
        resPrefix:'${rest_path}',
        partImgResPrefix: '${part_img_rest_path}',
        packageImgResPrefix: '${package_img_rest_path}',
        legendGroupImgRestPrefix: '${legend_group_img_rest_path}',
        legendImgRestPrefix: '${legend_img_rest_path}',
        photoTmpFileRestPrefix: '${photo_tmp_file_rest_path}',
        lang:'zh_CN',
        restpath: '',
        cdnPath:'',
        userCode:'test',
        referenceImageFolder: '',
        nopicPath:'/style/images/',
        nopicName:'no-img.png',
        appPath: ${isProduction} ? '../../../app' : './app',
        uxPath: ${isProduction} ? '../../../packages/ux/src' : './packages/ux/src'
    };

</script>
