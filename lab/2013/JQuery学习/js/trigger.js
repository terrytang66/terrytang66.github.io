$(document).ready(function(){
	$("button").click(function(){
		var msg="<p>"+$(this).attr("name")+"被单击了（第一个事件处理程序的执行）</p>";
		$("#show").append(msg);
	});

	$("button").click(function(){
		var msg="<p>"+$(this).attr("name")+"被单击了（第二个事件处理程序的执行）</p>";
		$("#show").append(msg);
	});	

	$("#buttonParent").click(function(){
		var msg=$("#show").html()+"<p>按钮父容器</p>";
		$("#show").html(msg);

	});

});

$(document).ready(function(){
	$("input[type=='button']").click(function(){
		$("button").trigger("click");
	});
});
$(document).ready(function(){
	$("input[type=='button']").click(function(){

		$("button").triggerHandler("click");
	});
});