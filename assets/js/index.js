$(function () {

    //获取用户信息
    getUserInfo();

    var layer = layui.layer;

    $('#btnLogout').on('click', function () {

        //提示用户是否要退出
        layer.confirm('请确认是否退出？', { icon: 3, title: '提示' }, function (index) {

            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token');
            //跳转到login页面
            location.href = '/login.html';


            layer.close(index);
        });
    })



})



function getUserInfo() {

    $.ajax({

        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        /* headers: {
            Authorization: localStorage.getItem('token') || ''
        }, */
        success: function (res) {


            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })

}


function renderAvatar(user) {

    //1.获取用户的名称
    var name = user.username || user.nickname;
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    //3.判断是否有头像，给其赋予头像
    if (user.user_pic !== null) {
        //渲染用户自己头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();//toUpperCase()字符转换为大写后的字符串。
        $('.text-avatar').html(first).show();
    }

}
