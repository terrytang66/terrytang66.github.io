
function getByClass(oParent,sClass){
    var aResult=[];
	var aEle=oParent.getElementsByTagName('*');
	for (var i = 0; i < aEle.length; i++) {
		if(aEle[i].className== sClass){
			aResult.push(aEle[i]);
		}
	};
	return aResult;
}
	// window.onload=function  () {
	// 	var ol=document.getElementById('uli');
	// 	var oli=getByClass(ol,'box');
	// 	for (var i = 0; i < oli.length; i++) {
	// 		 oli[i].style.background='red';
	// 		 };
			
	// };

// <ul id="uli">
// <li class="box" ></li>
// <li></li>
// <li class="box"></li>
// <li></li>
// <li class="box"></li>
// <li></li>
// </ul>
