 
//15:30

define(function(require, exports, module) {
	
	window.onerror=function(){return true;} 
	require('ace');
	var Drag = require('drag');
	var _page = 'editor-tabs-html';
	var _css = 'editor-tabs-css';
	var _js = 'editor-tabs-javascript';
	var css = $('a[href="#' + _css + '"]').text();
	var js = $('a[href="#' + _js + '"]').length > 0 ? $('a[href="#' + _js + '"]').text() : undefined;
	var APIs = {
		commit: '/course/codesubmit'
	};
    var sid = pageInfo.mid;
    if (OP_CONFIG.userinfo && OP_CONFIG.userinfo.uid) {
        sid += '_' + OP_CONFIG.userinfo.uid;
    } else {
        sid += '-' + Math.round(Math.random()*10000000);
    }
	var CodeEditor = function(elems) {
			this.elems = elems;
			this.editors = [];
			this.defaults = [];
			this.files = [];
			this.temp = '';
			this.runNow = true;
			this.wHeight = $(window).height();
			this.wWidth = $(window).width();
			this.initialization()
		}
	CodeEditor.prototype = {
		initialization: function() {
			var that = this;
			$.each(that.elems, function(i, v) {
				var editor = ace.edit(v);
				editor.setTheme("ace/theme/tomorrow_night");
				editor.getSession().setMode("ace/mode/" + $(v).attr('data-lang'));
				
			editor.session.setUseWrapMode(true);
            editor.session.setWrapLimitRange(null, null);
			
			editor.renderer.setShowPrintMargin(false);
           // editor.renderer.setPrintMarginColumn(100);
				
				editor.setFontSize('14px');
				editor.lang = $(v).attr('data-lang');
				editor.setHighlightActiveLine(false);
				editor.filename = $(v).attr('data-filename');
				that.defaults.push(editor.getValue());
				var file = {
					filename: $(v).attr('data-filename'),
					lang: $(v).attr('data-lang'),
					content: editor.getValue()
				};
				that.files.push(file);
				that.editors.push(editor);
				var timer;
				editor.on('change', function(e) {
					file.content = editor.getValue();
					if (timer) {
						clearTimeout(timer)
					}
					timer = setTimeout(t, 500)
				});

				function t() {
					if (that.runNow) {
						that.runCode()
					}
				}
			});
			setTimeout(function() {
				that.showViewport()
			}, 500)
		},
		showViewport: function() {

			var that = this;
			var viewPortElement = $('<iframe name="Consoleframe" id="J_Console" frameborder="0" width="100%" height="100%"></iframe>');
			viewPortElement.appendTo($('#viewPort-content'));
			
			this.runCode()
	
		},
		runCode: function() {
			var that = this;
			var iframeHtml;
			var  frameShow =function(iframeHtml,nopre){
				var iframe = window.frames['Consoleframe'];
			    var iframedocument = iframe.document ? iframe.document : iframe.contentDocument;
						iframedocument.open();
						iframeHtml=!nopre?("<pre>"+iframeHtml+"</pre>"):iframeHtml;
						iframedocument.write(iframeHtml);
						iframedocument.close()
			}
							
							
			if(that.files[0].lang=='php' && that.files.length == 1){ //php
			    var filename = that.files[0].filename;
			    $.post('/code/update', { lang: 'php', filename:filename, sid:sid, content:that.files[0].content }, function(data) {
			        $('#J_Console').attr('src', 'http://php.mukewang.com/'+sid+'/'+filename+'?rnd='+Math.random());
			        //frameShow(data.data.toString());
            	});
			}
			  else if(that.files[0].lang=='python' && that.files.length == 1){ //python
				 $.post('/course/runcode', { lang: 'python', code:that.files[0].content }, function(data) {
				  frameShow(data.data.toString())
				//html += '检测结果：'+data.result+'</p>';
				 });
			 }
			else if(that.files[0].lang=='c' && that.files.length == 1){ //c
				 $.post('/course/runcode', { lang: 'c', code:that.files[0].content }, function(data) {
				  frameShow(data.data.toString())
				 });
			 }   
			 else if(that.files[0].lang=='javascript' && that.files.length == 1){ //php
					 $.post('/course/runcode', { lang: 'javascript', code:that.files[0].content }, function(data) {
					  frameShow(data.data.toString())
					//html += '检测结果：'+data.result+'</p>';
					 });
			   }
			   
             else if(that.files[0].lang=='php' && that.files.length > 1){
					var  currentHtml='';
				$.each(that.files, function(i, v) {
					if (v.lang == 'php') {
						$.post('/code/update', { lang: 'php', filename:v.filename, sid:sid, code:v.content }, function(data) {
		                    $('#J_Console').attr('src', 'http://php.mukewang.com/'+sid+'/'+v.filename+'?rnd='+Math.random());
						//html += '检测结果：'+data.result+'</p>';
						 });
						 } 
						 else if(v.lang=='javascript'){
						 currentHtml += '<script>	window.onerror=function(){return true;};try {'+v.content+'} catch(err) {　document.writeln("Error name: " + err.name)　document.writeln("Error message: " + err.message)}</script>'
						 }
						 else if(v.lang=='css'){
						 currentHtml += '<style>' + v.content + '</style>'
							 
							 }
						else if(v.lang=='python'){
							 $.post('/course/runcode', { lang: 'python', code:v.content }, function(data) {
									currentHtml+=data.data;
									frameShow(currentHtml)
									//html += '检测结果：'+data.result+'</p>';
									 });
						 }
					 })
					}

			else if(that.files[0].lang=='java' && that.files.length == 1){ //c

					$.post('/course/runcode', { lang: 'java', code:that.files[0].content }, function(data) {

									frameShow(data.data.toString())

									});

			}


			 //html
			 else if(that.files[0].lang=='html'){
				 				 
				  $.each(that.files, function(i, v) {
				if (v.lang == 'html') {
					iframeHtml = v.content
				} else if (v.lang == 'css') {
					iframeHtml += '<style>' + v.content + '</style>'
				} else if (v.lang == 'javascript') {
					//禁止页面控制台报错
					iframeHtml += '<script>window.onerror=function(){return true};</script><script>'+v.content+'</script>'
				}
			   });
				   frameShow(iframeHtml,1)
				 
			  } 
			
		},
		_reset: function() {
			var that = this;
			$.each(that.editors, function(i, v) {
				var isHidden = $(v.container).is(':hidden');
				if (!isHidden) {
					v.setValue(that.defaults[i])
				}
			})
		},
		commit: function(lang,callback) {
			var that = this;
			var params = {};
			params.mid = pageInfo.mid;
			params.eid = pageInfo.eid;
			params.lang = lang;
			params.files = that.files;
			$.post(APIs.commit, params, function(json) {
				callback&&callback();
				switch (json.result) {
				case -200:
					$('#J_EditorCommit').fadeIn();
					if(pageInfo.next_mid==0){
						$('#J_EditorCommit').append('<p class="fail"><span class="status"></span>' + json.msg + ' <a class="operate faColor" id="J_CodeCancel">再试试</a>! <a class="operate suColor" id="J_CodeNext" href="' + json.data.next + '"> 返回课程</a></p><a href="javascript:;" class="close" id="J_Close"></a>')
					}else{
						$('#J_EditorCommit').append('<p class="fail"><span class="status"></span>' + json.msg + '，<a class="operate faColor" id="J_CodeCancel">再试试</a>！直接进入<a class="operate suColor" href="' + json.data.next + '">下一节</a></p><a href="javascript:;" class="close" id="J_Close"></a>');
					}
					break;
				default:
					$('#J_EditorCommit').fadeIn();
					if(pageInfo.next_mid==0){
						$('#J_EditorCommit').append('<p class="success"><span class="status"></span> 恭喜你,通过了本次课程 <a class="operate suColor" id="J_CodeNext" href="' + json.data.next + '">返回课程</a></p><a href="javascript:;" class="close" id="J_Close"></a>')
					}else{
						$('#J_EditorCommit').append('<p class="success"><span class="status"></span> 做的漂亮，准备进入 <a class="operate suColor" id="J_CodeNext" href="' + json.data.next + '">下一节</a>吧。</p><a href="javascript:;" class="close" id="J_Close"></a>')
					}
				}	
				
				$('#J_Close,#J_CodeCancel').on('click',function(){
					$('#J_EditorCommit').animate({'height':0},function(){
						$(this).html('').css({'height':'','display':'none'})
					})
				})	
				
			})
			
			
		}
	};
	module.exports = {
		init: function(elems) {
			return new CodeEditor(elems)
		}
	}
});
