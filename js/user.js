
var userInfo = null;

// 获取用户信息, 进行展示
$.ajax({
    url: "/user/queryUserMessage",
    async: false, //ajax改为同步请求, 必须请求结束之后才会加载后面的代码
    success: function (response) {
        console.log(response);
        // {error: 400, message: "未登录！"}
        if (response.error == 400) {
            // 没有登录, 需要跳到登录页
            location.href = "login.html";
        } else {
            // 获取到了用户信息, 要进行模板渲染
            // var html = template("userTpl", response);
            // $("#userInfoBox").html(html);
            userInfo = response;
        }
    }
})

$(function () {
    // 退出功能
    $("#logout").click(function () {
        // alert(1);
        $.ajax({
            url: "/user/logout",
            success: function (response) {
                console.log(response);
                if (response.success) {
                    // 跳到首页
                    mui.toast("退出成功!");
                    setTimeout(function () {
                        location.href = "index.html";
                    }, 1000);
                } else {
                    mui.toast(response.message);
                }
            }
        })
    })
    var html = template("userTpl", userInfo);
    $("#userInfoBox").html(html);
})