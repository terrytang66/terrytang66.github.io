function myAddEvent(obj,ev,fn){
	if (obj.attachEvent) {
		obj.attachEvent('on'+ev,fn)
	}else{
		obj.addEventListener(ev,fn,false);
	}
} 
//绑定事件代码
	