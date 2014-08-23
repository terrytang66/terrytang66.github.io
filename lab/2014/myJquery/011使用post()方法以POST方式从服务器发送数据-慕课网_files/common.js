/*=============================================================================
#     FileName: common.js
#         Desc: 非学习页入口脚本中调用（message,header,gotop and so on...）
#       Author: panwf
#   LastUpdate: 2013-10-18 10:58:04
=============================================================================*/
define(function(require, exports, module){
	//window.$ = require('jquery');
	//登录加载socket.io库
	//if(OP_CONFIG.userInfo){
	//	require.async('socket.io');
	//	require('chat');
	//	$.chat.init();
	//}

	//计算字符串长度
	String.prototype.strLen = function() {
	    var len = 0;
	    for (var i = 0; i < this.length; i++) {
	        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len ++;
	    }
	    return len;
	}


	//将字符串拆成字符，并存到数组中
	String.prototype.strToChars = function(){
	    var chars = new Array();
	    for (var i = 0; i < this.length; i++){
	        chars[i] = [this.substr(i, 1), this.isCHS(i)];
	    }
	    String.prototype.charsArray = chars;
	    return chars;
	}

	//判断某个字符是否是汉字
	String.prototype.isCHS = function(i){
	    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
	        return true;
	    else
	        return false;
	}

	//截取字符串（从start字节到end字节）
	String.prototype.subCHString = function(start, end){
	    var len = 0;
	    var str = "";
	    this.strToChars();
	    for (var i = 0; i < this.length; i++) {
	        if(this.charsArray[i][1])
	            len += 2;
	        else
	            len++;
	        if (end < len)
	            return str;
	        else if (start < len)
	            str += this.charsArray[i][0];
	    }
	    return str;
	}

	//截取字符串（从start字节截取length个字节）

	String.prototype.subCHStr = function(start, length){
	    return this.subCHString(start, start + length);
	}
	
	if(OP_CONFIG.userInfo){
		require.async('socket.io');
		require.async('chat', function(){
            $.chat.init();
        });
	}
	//非学习页加载头部和回到顶部脚本
	function popLoginSns(){
		require.async('../../logic/login/login-regist', function(login){
			login.init();
		});
	}
	
	(OP_CONFIG.page=='code') && $('#J_GotoTop').hide()
	
	
	function backTop(){
		h = $(window).height();
		t = $(document).scrollTop();
		if(t >=768){
			$('#backTop').show();
		}else{
			$('#backTop').hide();
		}
	}
	//顶部用户导航
	/*		if($('#nav_list').is(":visible")){
			$(this).removeClass("hover")
			$('#nav_list').hide();			
		}else{
			$(this).addClass("hover")
			$('#nav_list').show();			
		}

		return false;*/
	$('[action-type="my_menu"],#nav_list').on('mouseenter',function(){
		$('[action-type="my_menu"]').addClass("hover")
		$('#nav_list').show()
	})
    $('[action-type="my_menu"],#nav_list').on('mouseleave',function(){
		$('[action-type="my_menu"]').removeClass("hover")
	$('#nav_list').hide()
	});
	$('#set_btn').click(function() { location.href='/space/course' });

	$('#J_Login').on('click',popLoginSns);

	//回到顶部
	$(document).ready(function(e) {
		backTop();
		$('#backTop').click(function(){
			$("html,body").animate({scrollTop:0},200);	
		})

	});

	$(window).scroll(function(e){
		backTop();		
	})

});
