
// <style>
// *{margin: 0;padding: 0;}
// #div1{width:188px;height: 65px; margin: 100px auto;background:red;position: relative;overflow: hidden;}
// #div1 ul{position:absolute;left: 0;top: 0; }
// #div1 ul li{float:left;width:47px;height:65px;list-style: none;}
// /*offsetLeft/Top 可以综合考虑物体位置
// */</style>

window.onload=function  () {
	var od=document.getElementById('div1');
	var ol=od.getElementsByTagName('ul')[0];
	var uli=ol.getElementsByTagName('li');
	var speed=2;//速度
	ol.innerHTML=ol.innerHTML+ol.innerHTML;
	ol.style.width=uli[0].offsetWidth*uli.length+'px';
    function move(){
    	if(ol.offsetLeft<-ol.offsetWidth/2)
		{
			ol.style.left='0';
		}
		if(ol.offsetLeft>0){
			ol.style.left=-ol.offsetWidth/2+'px';
		}
		ol.style.left=ol.offsetLeft+speed+'px';//改为-的时候 向左运行
	}
	var timer=setInterval(move,30);
    od.onmouseover=function(){
    	clearInterval(timer);
    }
    od.onmouseout=function(){
    	timer=setInterval(move,30);
    }
    document.getElementsByTagName('a')[0].onclick=function(){
       speed=-2;
    }
      document.getElementsByTagName('a')[1].onclick=function(){
    	speed=2;
    }
}

// <body>
// <div id="div1">
// 	<ul>
// 		<li><img src="images/3.png"></li>
// 		<li><img src="images/1.png"></li>
// 		<li><img src="images/2.png"></li>
// 		<li><img src="images/3.png"></li>

// 	</ul>
// </div>
