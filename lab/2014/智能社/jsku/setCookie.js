function setCookie(name,value,iDay){	
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+
	value+';expires='+oDate;//多少时间过期
}
// setCookie('username','hello',10);
// setCookie('pass','hello',14);
//设置页面中的cookie
function removeCookie(name){
	setCookie(name,1,-1);
}
//去除cookie