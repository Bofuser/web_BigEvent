$(function () {

    var form = layui.form;
    var layer = layui.layer;

    //验证消息
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })



    initUserInfo();


    //初始化用户信息
    function initUserInfo() {


        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }

                //调用form.val()表单快速赋值
                form.val('formUserInfo', res.data);

            }
        })

    }

    //重置内容
    $('#btnReset').on('click', function (e) {

        //阻止默认提交事件
        e.preventDefault();
        //调用初始化函数
        initUserInfo();

    })


    //提交用户信息并更新信息
    $('.layui-form').on('submit', function (e) {

        //阻值默认提交行为
        e.preventDefault();
        //发起ajax请求获取数据
        // 发起 ajax 数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })

    })


})





