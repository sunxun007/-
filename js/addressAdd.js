$(function () {


    if (localStorage.getItem('addressInfo')) {
        var address = JSON.parse(localStorage.getItem('addressInfo'))
        console.log(address);
        var html = template("addAddressTpl", address);
        $("#editForm").html(html);
    } else {
        var html = template("addAddressTpl", {});
        $("#editForm").html(html);
    }




    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);
    $('#selectCity').on('tap', function () {
        console.log(1);
        picker.show(function (SelectedItem) {
            console.log(SelectedItem);
            $('#selectCity').val(SelectedItem[0].text + SelectedItem[1].text + SelectedItem[2].text)
        })
    })


    $('#addAddress').on('tap', function () {

        var username = $.trim($('[name="username"]').val())
        var postCode = $.trim($('[name="postCode"]').val())
        var city = $.trim($('[name="city"]').val())
        var detail = $.trim($('[name="detail"]').val())
        if (!username) {
            mui.toast("请输入收货人");
            return;
        }
        if (!postCode) {
            mui.toast("请输入邮编");
            return;
        }
        if (!city) {
            mui.toast("请选择省市区");
            return;
        }
        if (!detail) {
            mui.toast("请输入详细地址");
            return;
        }
        var data = {
            recipients: username,
            postcode: postCode,
            address: city,
            addressDetail: detail
        }

        if (!localStorage.getItem('addressInfo')) {
            $.ajax({
                url: '/address/addAddress',
                async: false,
                type: 'post',
                data: data,
                success: function (res) {
                    if (res.success) {
                        mui.toast("添加地址成功!");
                        setTimeout(function () {
                            location.href = "address.html";
                        }, 1000);
                    }
                    else {
                        mui.toast(res.message);
                    }
                }
            })
        } else {
            data.id = address.id;
            $.ajax({
                url: '/address/updateAddress',
                type: 'post',
                async: false,
                data: data,
                success: function (res) {
                    if (res.success) {
                        mui.toast("修改地址成功!");
                        setTimeout(function () {
                            location.href = "address.html";
                        }, 1000);
                    }
                    else {
                        mui.toast(res.message);
                    }
                }
            })
        }
        localStorage.removeItem("addressInfo")
    })






})