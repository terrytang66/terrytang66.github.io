/*=============================================================================
#     FileName: view_code.js
#         Desc: 代码查看器-查看同学代码
#       Author: yaojia
#   LastChange: 2013-08-23 	
=============================================================================*/
define(function(require, exports, module){
	//引入编辑器依赖
	
	var Code_editor = require('codeEditor');
		require('/static/component/base/tab/tab.js');

	var ViewCode=function(api,codeID,opt){
		this.width=$(window).width();
		this.height=$(window).height();
		this.newEditors=[];
		this.api=api;
		this.codeID=codeID;
		this.opt= opt||{};
		this.init()
	}
	ViewCode.prototype={
		init:function(){
		   	var _this=this;
		   	$.getJSON(this.api,{id :this.codeID}, function(data){
			  	if(data !== 0){
				    var viewHeight=_this.height*0.8-100; //计算编程区域高度
			    	var tmpl='<div class="view-editor-box" id="J_TabsViewEditor">';
						tmpl+='<div class="editor-tab">';
						tmpl+='<span class="l">查看同学的代码</span>';     
						tmpl+='<ul class="l" id="J_TabViewType">';
						for (var i=0;i<data.files.length;i++){
							tmpl+='<li><a href="#view-editor-tabs-'+data.files[i].lang+'">'+data.files[i].filename+'</a></li>';
						}
						tmpl+='</ul>';
						tmpl+='</div>';
						for (var i = 0; i < data.files.length; i++){
							tmpl+='<div class="tab-con" style="position:absolute; height:'+viewHeight+'px; left:0;top:50px;bottom:0;right:0" id="view-editor-tabs-'+ data.files[i].lang +'" data-filename="'+data.files[i].filename+'" data-lang="'+data.files[i].lang+'"></div>'
						}
						tmpl+='<div class="run_area">';
						tmpl+='<a class="btn btn-gray btn-large run">运行</a>';
						tmpl+='</div>';
						tmpl+='</div>';
				   	if(_this.opt.type=='reply'){
					 	_this.showCode(tmpl,data);
					 	$('#J_RepPublish').hide(); 
					}
					else{
					 	_this.createViewPort(tmpl,data);
					}		
             }  
	       });
		},
		showCode:function(tmpl,data){
			$('#J_ViewCodeTabs').hide();
			if($('#reply_code_area').size()){
				$('#reply_code_area').html(tmpl);
			}else{
               	$('<div id="reply_code_area"></div>').html(tmpl).appendTo($('#qa_code'));
			}
			this.initEditor(data);	  
		},
		createViewPort:function(html,data){
		  	var _this=this;
	            $.layer({
					type:1,
					title:false ,
					move:['.xubox_title' , true],
					shade:[0.8,'#000',true],
					shadeClose:true,
					border:[10,0.8,'#000',true],
					//iframe : { src : '/runner.html'},
					area:[this.width*0.8 ,this.height*0.8],
					offset:['40px',''],
			    	page:{
						html:html
					},
					success:function(){
						_this.initEditor(data);
					}
				});
		},
		
		initEditor:function(data){
			var _this=this;
			$('#J_TabsViewEditor').height(_this.height*0.8);
			$("#J_TabsViewEditor").tabs(); 
			var $elemsView = $('#J_TabsViewEditor').find('.tab-con');
		   	$.each($elemsView,function(k,dom){
		  		var domID=($(dom).attr('id'));
				var nE=Code_editor.init(domID,data.files[k].content,data.files[k].lang,data.files[k].filename);	//初始化编辑器，并赋值
				_this.newEditors.push(nE.editor); //把新编辑器对象们放入数组待用。
			});
			$('.run').click(function(){
				_this.runCode();
			});		
		},
		runCode:function(){
			var runcode='';

			if(this.newEditors.length==1&&(this.newEditors[0].lang=="php"||this.newEditors[0].lang=="java")){
				var $codeForm=$("#run-code-form");
				if(!$codeForm.length){

					$codeForm=$("<form style='display:hidden;' id='run-code-form' action='/course/viewresult' target='runcoderesult' method='post'><textarea name='code'></textarea><input type='text' name='lang' /></form>");
					$codeForm.appendTo(document.body);
				}
				$codeForm.find("textarea").val(this.newEditors[0].getValue());
				$codeForm.find("input").val(this.newEditors[0].lang);
				$codeForm.submit();
				return ;
			}
			
			//console.dir(this.newEditors);
			$.each(this.newEditors,function(k,v){
				if(v.lang=='css'){
					runcode+='<style>';	 
					runcode+=v.getValue();
					runcode+='</style>';	 
				} 
				else{
					runcode+=v.getValue()
				} 
			});
			

			var OpenWindow=window.open('');
			OpenWindow.document.write(runcode);
			OpenWindow.document.write("</BODY>")
			OpenWindow.document.write("</HTML>")
			OpenWindow.document.close()
		},	
		getEditors:function(){
			return this.newEditors;
		}		   
	
	}		   
    
module.exports={
	init:function(api,codeID,opt){
		return new ViewCode(api,codeID,opt);
	}
}			
	 
});
