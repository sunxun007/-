/*
1. 监听注册按钮点击
2. 提取input标签内容, 并进行校验, 如果内容为空,或者不合法, 给错误提示
3. 调用获取认证码接口, 得到认证码
4. 调用注册接口, 进行注册
5. 如果注册成功, 跳转到登录页面
*/

$(function () {

    $("#register-btn").click(function () {
        // alert(1)
        // $.trim去除两侧的空格
        var username = $.trim($("[name='username']").val());
        var mobile = $.trim($("[name='mobile']").val());
        var password = $.trim($("[name='password']").val());
        var againPass = $.trim($("[name='againPass']").val());
        var vCode = $.trim($("[name='vCode']").val());

        //数据校验
        if (!username) {
            // alert("用户名不能为空!");
            mui.toast("用户名不能为空!");
            return;
        }

        var reg = /^1[3-9]\d{9}$/;
        if (!reg.test(mobile)) {
            mui.toast("手机号码格式错误!");
            return;
        }

        if (!password) {
            mui.toast("密码不能为空!");
            return;
        }

        if (againPass != password) {
            mui.toast("两次密码不一致!");
            return;
        }

        if (!vCode) {
            mui.toast("验证码不能为空!");
            return;
        }

        $.ajax({
            url: "/user/register",
            type: "post",
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function (response) {
                console.log(response);
                if (response.success) {
                    // 注册成功, 跳到登录页面
                    // 延时1秒之后跳到登录页面
                    mui.toast("注册成功!");

                    setTimeout(function () {
                        location.href = "login.html";
                    }, 1000);
                } else {
                    // 给用户错误提示
                    mui.toast(response.message);
                }
            }
        })
    });

    // 3. 调用获取认证码接口, 得到认证码
    $("#getCode").click(function () {
        $.ajax({
            url: "/user/vCode",
            success: function (response) {
                console.log(response);
            }
        });

    });

})