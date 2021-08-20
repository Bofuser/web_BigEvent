$(function () {

    var layer = layui.layer;
    var form = layui.form;

    initArtCateList();

    function initArtCateList() {

        //发起ajax请求获取数据
        $.ajax({

            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }

        })

    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                //更新列表
                initArtCateList();
                layer.msg('新增分类成功！')
                layer.close(indexAdd);
            }
        })
    })


    // 为编辑类别按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })

        //在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中：
        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {

                form.val('form-edit', res.data)
            }
        })


    })

    //通过代理方式绑定后更新数据分类
    $('body').on('submit', '#form-edit', function (e) {

        //阻止默认提交
        e.preventDefault()
        //发起ajax请求
        $.ajax({

            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改数据失败！');
                }
                //更新列表
                initArtCateList();
                layer.msg('修改数据成功！');
                layer.close(indexEdit);
            }


        })
    })

    //删除数据
    $('tbody').on('click', '.btn-delete', function () {

        //在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中：
        var id = $(this).attr('data-id')

        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 发起请求获取对应分类的数据
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate' + id,
                success: function (res) {

                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！');
                    }
                    layer.msg('删除分类成功！');
                    layer.close(index);
                    //更新列表
                    initArtCateList();
                }
            })

        });




    })


})