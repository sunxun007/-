/*
1. 监听搜索按钮点击事件
2. 获取文本框中的内容
3. 如果内容为空, 给错误提示
4. 如果不为空, 跳到搜索结果页面, 内容也要带过去
*/

/*
搜索历史
1. 保存在localStorage中
2. 保存的是数组转成字符串后的结果
3. 页面一加载, 就要从localStorage中读取字符串内容, 转成数组, 再模板进行渲染
*/

$(function(){

    var keyArr = [];//保存历史记录

    // 1. 监听搜索按钮点击事件
    $("#search-btn").click(function(){
        // alert(1)
        // 2. 获取文本框中的内容
        var keyword = $(this).siblings("input").val();
        // 3. 如果内容为空, 给错误提示
        if(keyword) {
            // 保存历史记录
            // keyArr.push(keyword);
            // 判断当前keyword是否已经存在, 如果存在, 先删除, 再添加
            var index = keyArr.indexOf(keyword);
            if(index != -1) {
                //删除第index位置的元素
                keyArr.splice(index, 1);
            }

            // 在第一个位置添加关键字
            keyArr.unshift(keyword);
            localStorage.setItem("keyArr", JSON.stringify(keyArr));

            // 4. 如果不为空, 跳到搜索结果页面, 内容也要带过去
            location.href = "search-result.html?keyword=" + keyword;
        }else {
            alert("请输入搜索关键字!");
        }
    });

    // 3. 页面一加载, 就要从localStorage中读取字符串内容, 转成数组, 再模板进行渲染
    if(localStorage.getItem("keyArr")){//判断有没有保存历史记录
        keyArr = JSON.parse(localStorage.getItem("keyArr"));
        console.log(keyArr);

        // 页面渲染
        var html = template("historyTpl", {result: keyArr});
        $("#history-box").html(html);
    };

    // 点击历史记录, 跳到搜索结果页
    $("#history-box").on("click", "li", function(){
        // alert(1);
        var keyword = $(this).text();
        // alert(keyword);
        location.href = "search-result.html?keyword=" + keyword;
    });

    //实现清空历史的功能
    //1. 监听点击事件
    //2. 删除localStorage中的历史记录
    //3. 清空当前的html页面

    $("#clearBtn").click(function(){
        // alert(1)
        localStorage.removeItem("keyArr");
        $("#history-box").html("");
    });
})
