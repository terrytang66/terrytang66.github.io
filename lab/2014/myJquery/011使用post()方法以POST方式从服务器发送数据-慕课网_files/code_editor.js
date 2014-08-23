/*=============================================================================
#     FileName: CodeEditor.js
#         Desc:ACE编辑器封装
#       Author: yaojia
#   LastChange: 2013-10-31
=============================================================================*/
define(function(require, exports, module){
	//引入依赖		
	
	require('ace');
	var CodeEditor =function(DomID,codeValue,lang,filename){
		this.DomID=DomID;
		this.codeValue=codeValue;
		this.lang=lang.toLocaleLowerCase();
		this.filename=filename;
		this.editor={};
		this.createEditor()
		}
	   CodeEditor.prototype={
		   createEditor:function(){
			     var editor = ace.edit(this.DomID);
				 editor.setTheme('ace/theme/tomorrow_night');
				 editor.getSession().setMode('ace/mode/'+this.lang);
				 editor.setFontSize('14px');
				 editor.focus();
				 editor.gotoPageUp();
				 editor.lang=this.lang;
				 editor.fileName=this.fileName;
				 editor.setValue(this.codeValue);
				 
			editor.session.setUseWrapMode(true);
            editor.session.setWrapLimitRange(null, null);
			editor.renderer.setShowPrintMargin(false);
				 this.editor=editor;
			   },
		  setVal:function(codeValue){
			  this.editor.setValue(codeValue)
			  },
		    getVal:function(){
			  return this.editor.getValue()
			  },
			getFileData:function(){
					return {
						filename: this.filename, 
						lang    : this.lang,
						content : this.getVal()
					}
				}
		   }	
   		

    module.exports = {
        init : function(DomID,codeValue,lang,filename){
		return new CodeEditor(DomID,codeValue,lang,filename);
		}
    };
});



