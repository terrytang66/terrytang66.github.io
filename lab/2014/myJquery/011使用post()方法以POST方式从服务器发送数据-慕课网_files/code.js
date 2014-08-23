define(function(require, exports, module){
	//引入依赖
	require('/static/lib/layer/1.6.0/layer.min.js');
	require('tab');
	var ceditor = require('ceditor');
	var commonInterface = require("/static/page/course/common/course_detail_common.js");
	//页面交互
	
	var isFullScreen=false;
	//展开
	var Expand=function(){
		$('#viewPort').css({
			'position':'absolute',
			'width':'100%',
			'left':0,
			'top':0,
			'zIndex':'100'
		})
		isFullScreen=true;
	}
		
	//收起
	var Fold=function(){
		$('#viewPort').css({
			'position':'',
			'width':''
		})
	 	isFullScreen=false;
	}
		
		
	$('#view-zoomIn').on('click',function(){
	 	Fold();
	 	$('#view-zoomOut').show();
		$('#view-zoomIn').hide()
	});
	
   	$('#view-zoomOut').on('click',function(){
		Expand();
		$('#view-zoomOut').hide();
		$('#view-zoomIn').show()
	});
		
	//查看运行结果
	$('#view-resultBtn').on('click',function(){
		Expand();
	   	$('#view-resultBtn').hide()
		$('#view-resultBtn-close').show();
		$('#view-zoomOut').hide()
	});
	
  	$('#view-resultBtn-close').on('click',function(){
	    Fold();
	    if($(window).width()<1224){
	      	$('#view-resultBtn').show();
	    }
	   	$(this).hide()
	});
	
	$(window).on('resize',function(){
		Resize.init();
		Fold();
		$('#view-zoomIn').hide();
		$('#view-resultBtn-close').hide();
		if($(window).width()>1224){
			$('#view-zoomOut').show()
		}	
		else{
			$('#view-zoomOut').hide();
			$('#view-resultBtn').show()
		}	
		
	});
		

 	$('#viewPort').hover(function(){
	 	if($(window).width()>1224){	
	 		(!isFullScreen) && $('#view-zoomOut').show();
	 		(isFullScreen)  && $('#view-zoomIn').show() 	
	 	}
	 	else{
			(isFullScreen)  &&  $('#view-resultBtn-close').show()
		}
	},function(){
		if($(window).width()>1224){	
			!isFullScreen&&$('#view-zoomOut').hide();
			isFullScreen&&$('#view-zoomIn').hide() 	 
		}
		else{
			isFullScreen&&$('#view-resultBtn-close').hide()
		}
	});
		
 	$('#bar').on('click',function(){
		$(window).scrollTop($(this).offset().top);
	});

	var $tabA = $('#J_TabType').find('li a');
	var langArr = [];
	var extHash = {
		'js' : 'javascript',
		'py' : 'python'
	};
	$tabA.each(function(i, v){
		var ext = $(v).text().split('.')[1];
		if(extHash[ext]){
			langArr.push(extHash[ext]);
		} else {
			langArr.push(ext); 
		}
	});

	//初始化
	var $elems    = $('#J_EditorTabs').find('.editor-item');
	var $resetBtn = $('#J_EditorReset');
	var css       = $('a[href="#editor-tabs-css"]').attr('href');
	//接口列表
	var APIs = {
		othersCode : '/course/otherscode',
		qas        : '/course/ajaxmediaques',
		saveques   : '/course/ajaxsaveques',
		viewCode   : '/course/viewquescode'
	};
	//问题主语言
	var mainLang = $('#J_CodeLang').attr('data-lang');

	//初始化
	var ceditor = ceditor.init($elems);	
	var Resize ={ //页面resize管理器
		init:function(){
			this.re();
		},
		re:function(){  //数字为测量出来的，如修改页面元元素高度需要重新修改数字
		var cH=$(window).height()-127; 	
	   $('.code-container-autoheight').height(cH);
	   $('.editor-item').height(cH-90);
	   $('#viewPort-content').height(cH);
	   

		}	
	}	 
	Resize.init();
	
	//点击清空答案区,循环编辑器对象，查找替换
	$.each(ceditor.editors,function(k,v){
		$(v).one('click',function(){
			v.find('<!--此处为答题区-->'); 
			v.replace('');
		})
	});


    $('#J_EditorTabs').fadeIn().tabs(); 
	$('.editor-btn').fadeIn();

	//提交
	$('#J_Commit').on('click', function(){
		ceditor.commit(mainLang,commonInterface.tabList&&commonInterface.tabList.mate.load);	
	});

   	//发疑问
   	//var WcodeData=window.WcodeData={}; 

   	$.each("qa,note".split(","),function(k,v){
   		commonInterface.remote[v].extendMethod("reset",function(){
   			$(".js-shot-code[data-type='"+v+"']").removeClass("shoted").attr("title","点击拍照保存代码");
   		});
   	});

   	function codeShotAnimate(target){
		if(!target) return ;
		var offset=$(target).offset(),
			pLeft=offset.left,
			pTop=offset.top,
			$source=$('#J_EditorTabs'),
			sourceOffset=$source.offset();
		$('#J_EditorTabs').clone().appendTo($('body')).css({
			position:'absolute',
			left:sourceOffset.left,
			width:$source.width(),
			top:sourceOffset.top,
			zIndex:9999999
		}).animate({left:pLeft,top:pTop,width:0,height:0,opacity:0},function(){
			$(this).remove()
		});
	}
   	$(".js-shot-code").click(function(){
   		var $this=$(this);
   		if(!$this.hasClass("shoted")){
   			$this.addClass("shoted").attr("title","点击取消");
   			var files=[];
			$.each(ceditor.editors,function(k,v){
				var file={
					filename:v.filename, 
					lang:v.lang,
					content:v.getValue()
				};
				files.push(file);
			})
			var jsonData={
				lang :mainLang,
				files: files
			}
			//pageInfo.code[$(this).attr("data-type")]=jsonData;
   			commonInterface.remote[$this.attr("data-type")].set(jsonData);
   			codeShotAnimate($this);
   		}
   		else{
   			$this.removeClass("shoted").attr("title","点击拍照保存代码");
   			commonInterface.remote[$this.attr("data-type")].reset();
   		}
   	});

   	/*var codeDiscussPublish=function($target){
		this.target=$target;
		pageInfo.code={};
		this.initialize($target);
		this.jsonData=null;

	}
	
	codeDiscussPublish.prototype={
		initialize:function($target){
			var _this=this;
			this.target.delegate('.J_ShotBtn','click',function(){
				if(!$(this).hasClass('shoted')){
					$(this).addClass('shoted').attr('title','点击取消');
					$(this).attr('hasCode',1);
					var files=[];
					$.each(ceditor.editors,function(k,v){
						var file     = {
							filename: v.filename, 
							lang    : v.lang,
							content : v.getValue()
						};
						files.push(file)
					})
					var jsonData={
						lang :mainLang,
						files: files
					}
					pageInfo.code[$(this).attr("data-type")]=jsonData;
					_this.takePicAnim(this);
				}else{
					_this.reSet(this);
				}
			})	
		},
		reSet:function(target){
			var $target=$(target);
			if($target.hasClass('shoted')){
			 	$target.removeClass('shoted').attr('title','点击拍照保存代码' );
				$target.attr('hasCode',0);
				pageInfo.code[$target.attr("data-type")]=null;
				return  this
			}
			else{
				return  this
			}
			
		},
		takePicAnim:function(target){
			if(!target) return ;
			var offset=$(target).offset(),
				pLeft=offset.left,
				pTop=offset.top,
				$source=$('#J_EditorTabs'),
				sourceOffset=$source.offset();

			$('#J_EditorTabs').clone().appendTo($('body')).css({
				position:'absolute',
				left:sourceOffset.left,
				width:$source.width(),
				top:sourceOffset.top,
				zIndex:9999999
			}).animate({left:pLeft,top:pTop,width:0,height:0,opacity:0},function(){
				$(this).remove()
			});
		}
	}
   
    // var jsonData= { mid : pageInfo.mid, eid : pageInfo.eid, content : $.trim($('#codeDiscusPublish').find('textarea').val())};
    var codeData=window.codeData= new codeDiscussPublish($('.js-code-publish'));
	//var codeData=window.codeData= new codeDiscussPublish($('#NotePublist')) 
     
*/



	//tabs
	$(function(){ 
		//大图查看器
		$.fn.viewPhoto=function(){
			return this.each(function(){

				//如果图片包含链接
				if($(this).parent().get(0).tagName.toLocaleLowerCase() == 'a'){
					$(this).parent('a').on('click',function(e){
						winH=$(window).height();
						//winW = $(window).width()
						e.preventDefault();
						var imgurl=$(this).attr('href');
						var warper=$('<div class="photo-view-warper"></div>').appendTo($('body')).fadeIn();
						var imgplace=$('<div class="show-img"><img id="imgplacHolder" src="http://l.yimg.com/g/images/progress/balls-24x12-black.gif"><a href="#" id="closex" >×</a></div>').appendTo($('body'));;
						var img=new Image();
						img.src=imgurl;
						//加载完毕
						img.onload=function(){
							var iH=img.height;
							//var iW=img.width; 'left':(winW+iW)/2-10

							if(winH>iH){
								$('#imgplacHolder').css({'marginTop':(winH-iH)/2});
								$('#closex').css({'top':(winH-iH)/2-40});
							}

							$('#imgplacHolder').hide();
							$('#imgplacHolder').attr('src',imgurl);
							$('#imgplacHolder').fadeIn();
							$('#closex').on('click',function(){
								warper.remove();
								$('.show-img').remove()
							});
						}
					})

				}
			})
		};

		$('#J_CodeDescr img').viewPhoto();
	});

	//重置代码

	$('#J_EditorReset').on('click', function(){
		ceditor._reset();
	});
	
	//任务提示
	
	$('#J_CodeQa').find('dt').on('click',function(){
		 $(this).siblings('dd').slideToggle()
	})


});
