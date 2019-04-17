$(function () {
    var adress = null
    $.ajax({
        url: '/address/queryAddress',
        success: function (res) {
            console.log(res);
            adress = res;
            var html = template("addressTpl", { result: res });
            $("#address-box").html(html);
        }
    })
    $('#address-box').on('tap', '#del', function () {
        var id = $(this).attr("data-id");
        var li = this.parentNode.parentNode;
        console.log(id);
        mui.confirm("确定删除", "温馨提示", ["取消吧", "决定了"], function (selectItem) {
            console.log(selectItem);
            if (selectItem.index == 1) {
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        console.log(res.success);
                        location.reload()
                    }
                })
            } else {
                mui.swipeoutClose(li);
            }
        })
    })
    $('#address-box').on('tap', '#edit', function () {
        var id = $(this).attr("data-id");
        console.log(adress);

        for (var i = 0; i < adress.length; i++) {
            if (adress[i].id == id) {
                localStorage.setItem('addressInfo', JSON.stringify(adress[i]));
                location.href = "addAddress.html"
                break;
            }

        }
    })





})