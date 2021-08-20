$(function () {

    $(function () {
        var layer = layui.layer
        var form = layui.form

        initCate()
        // 初始化富文本编辑器
        initEditor()
        // 定义加载文章分类的方法
        function initCate() {
            $.ajax({
                method: 'GET',
                url: '/my/article/cates',
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('初始化文章分类失败！')
                    }
                    // 调用模板引擎，渲染分类的下拉菜单
                    var htmlStr = template('tpl-cate', res)
                    $('[name=cate_id]').html(htmlStr)
                    // 一定要记得调用 form.render() 方法
                    form.render()
                }
            })
        }
    })

    //设置文章初始状态 
    var art_state = '已发布';
    var img = 'http://t.cn/RCzsdCq';
    //绑定草稿按钮，当点击该按钮时状态发生改变
    $('#btnSave2').on('click', function () {

        art_state = '草稿';
    })

    //发布文章数据
    $('#form-pub').on('submit', function (e) {

        // 1. 阻止表单的默认提交行为
        e.preventDefault()
        // 2. 基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData($(this)[0])
        // 3. 将文章的发布状态，存到 fd 中
        fd.append('state', art_state)
        fd.append('cover_img', img)
        //发起ajax请求
        publishArticle(fd);
    })


    //发布请求函数
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }

})