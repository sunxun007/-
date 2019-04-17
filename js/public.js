$(function () {

    // 1.监听a标签点击事件

    $("body").on("tap", "a", function () {
        // alert(1);
        // 2.提取出a标签的href值
        var url = $(this).attr("href");
        if (url) {
            // 3.使用mui打开页面
            mui.openWindow(url);
        }
    });


});