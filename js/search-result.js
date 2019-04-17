var keyword = getParamsByUrl(location.href, "keyword");

var page = 1;//记录当前加载第几页

var html = ""; //保存当前页面的html

var priceSort = 1; //排序规则, 使用价格排序（1升序，2降序）

var This = null; // 保存上拉加载组件的this指向

$(function () {

    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // 监听价格按钮的点击事件
    // tap事件体验在移动端会更好, 没有300ms延迟
    $("#price-btn").on("tap", function () {
        // alert(1);
        // 1. 修改price参数的值, 1和2进行切换
        priceSort = priceSort == 1 ? 2 : 1;

        // 2. 重新加载数据
        // 重置相关参数
        page = 1;
        html = "";
        // 重置上拉加载组件
        mui('#refreshContainer').pullRefresh().refresh(true);

        getData();

    });

});

// ajax请求搜索结果
function getData() {

    // This = this;

    if (!This) {
        This = this;
    }

    // console.log(This);

    $.ajax({
        url: "/product/queryProduct",
        type: "get",
        data: {
            proName: keyword,
            page: page++,
            pageSize: 3,
            price: priceSort
        },
        success: function (response) {
            console.log(response);

            if (response.data.length > 0) {
                // 注意: 下一页数据应该追加在之前的数据之上, 而不是覆盖
                html += template("searchTpl", response);
                $("#search-box").html(html);

                // 收起上拉加载组件
                // true表示没有更多数据了; false表示还可以继续上拉加载
                // 注意: this指向问题, 必须指向上拉加载组件对象
                This.endPullupToRefresh(false);
            } else {
                //没有数据
                This.endPullupToRefresh(true);
            }
        }
    });
}


// http://localhost:3000/m/search-result.html?keyword=1&address=hehe
function getParamsByUrl(url, name) {
    var params = url.substr(url.indexOf("?") + 1);
    // console.log(params); keyword=1&address=hehe
    var arr = params.split("&");
    // console.log(arr); ["keyword=1", "address=hehe"]
    for (var i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        var result = arr[i].split("=");
        // console.log(result);

        if (result[0] == name) {
            return result[1];
        }
    }

    return null;
}

