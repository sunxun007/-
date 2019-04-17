$(function () {
    $('#modify-btn').on('tap', function () {
        var orginPass = $.trim($('[name="orginPass"]').val())
        var newPassword = $.trim($('[name="newPassword"]').val())
        var againPass = $.trim($('[name="againPass"]').val())
        var getCode = $.trim($('[name="vCode"]').val())

        if (!orginPass) {
            mui.toast("请输入原密码");
            return;
        }

        if (!newPassword) {
            mui.toast("请输入新密码");
            return;
        }

        if (againPass != newPassword) {
            mui.toast("两次密码不一致");
            return;
        }

        if (!getCode) {
            mui.toast("请输入认证码");
            return;
        }


        $.ajax({
            url: "/user/updatePassword",
            type: 'post',
            data: {
                oldPassword: orginPass,
                newPassword: newPassword,
                vCode: getCode
            },
            success: function (res) {
                if (res.success) {
                    location.href = "login.html";
                } else {
                    mui.toast(res.message);
                }
            }
        })
    })
    $("#getCode").on("tap", function () {
        $.ajax({
            url: "/user/vCodeForUpdatePassword",
            success: function (res) {
                console.log(res);
            }
        })

    });

})
