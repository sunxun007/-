/*
1. 监听点击事件
2. 获取文本框内容, 进行校验
3. 调用登录接口
4. 如果登录成功, 跳会员中心user.html
*/

$(function () {
    $("#login-btn").click(function () {
        var username = $.trim($("[name='username']").val());
        var password = $.trim($("[name='password']").val());

        if (!username) {
            mui.toast("用户名不能为空!");
            return;
        }

        if (!password) {
            mui.toast("密码不能为空!");
            return;
        }

        $.ajax({
            url: "/user/login",
            type: "post",
            data: {
                username: username,
                password: password
            },
            beforeSend: function () {
                $("#login-btn").html("正在登录...");
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    // 跳到会员中心页面
                    mui.toast("登录成功!");

                    setTimeout(function () {
                        location.href = "user.html";
                    }, 1000);
                } else {
                    mui.toast(response.message);
                    $("#login-btn").html("登录");
                }
            }
        })

    });
})