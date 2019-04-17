// 当页面的DOM结构加载完成之后 执行回调函数中的代码
$(function () {

	// 初始化区域滚动组件
	mui('.mui-scroll-wrapper').scroll({
		deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
	});

	// 请求一级分类数据
	$.ajax({
		url: "/category/queryTopCategory",
		type: "get",
		success: function (response) {
			console.log(response);
			// 渲染模板
			var html = template("category-first", { result: response.rows });
			// console.log(html);
			// 把html填充在div中
			$("#links").html(html);

			//让第一个一级分类默认选中, 有active样式
			$("#links").find("a").eq(0).addClass("active");

			if(response.rows.length>0) {
				// 一级分类数据请求到之后, 就请求第一个一级分类的二级分类数据
				getSencodCategory(response.rows[0].id);
			}
		}
	});

	
	// 通过事件委托, 给a标签加点击事件
	$("#links").on("click", "a", function () {
		//给当前点击的a标签加active样式
		$(this).addClass("active").siblings().removeClass("active");

		// alert(1)
		// 获取自定义的属性
		var id = $(this).attr("data-id");
		// alert(id);

		// ajax请求二级分类数据
		getSencodCategory(id);
	});

	function getSencodCategory(id) {
		// ajax请求二级分类数据
		$.ajax({
			url: "/category/querySecondCategory",
			type: "get",
			data: {
				id: id
			},
			success: function(response){
				console.log(response);
				// {total: 5, rows: Array(5)}
				var html = template("category-second", response);
				$("#brand-list").html(html);
			}
		})
	}

});
