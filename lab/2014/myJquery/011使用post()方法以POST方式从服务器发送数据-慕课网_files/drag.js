define(function(require, exports, module){
	var Drag = function(id){   //拖拽如果里面是iframe 会变卡
		var el = document.getElementById(id);
		var handler=document.getElementById('dragTit');
		el.style.zIndex=999;  
		var drag = function(e) {
			$('#masker').show();
			e = e || window.event;
			//阻止默认浏览器动作(W3C)
			if ( e && e.preventDefault )
				{ e.preventDefault();}
			//IE中阻止函数器默认动作的方式
			else {
				window.event.returnValue = false;
				return false;}
				!+"\v1"? document.selection.empty() : window.getSelection().removeAllRanges();
				el.style.left = e.clientX - el.offset_x  + "px";
				el.style.top = e.clientY - el.offset_y  + "px";
		}
		var dragend = function(){

			$('#masker').hide();
			document.onmouseup = null;
			document.onmousemove = null;

		}
		var dragstart = function(e){
			$('#masker').show();

			e = e || window.event;
			el.offset_x = e.clientX - el.offsetLeft;
			el.offset_y = e.clientY - el.offsetTop;
			document.onmouseup = dragend;

			document.onmousemove = drag;

			return false;
		}
		handler.onmousedown = dragstart;
	}
	module.exports = {
		init : Drag
		//getIconArr:faceLib
	};
})
