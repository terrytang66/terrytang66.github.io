function getPos (ev) {
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	return{x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop};
}



// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="utf-8"/>
// <title>半透明div</title>
// <script type="text/javascript">
// function getPos (ev) {
//     var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
// 	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
// 	return{x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop};
// }

// document.onmousemove=function(ev) {
// 	var oEvent=ev||event;
// 	var oDiv=document.getElementById('div1');
// 	var pos=getPos(oEvent);
// 	oDiv.style.left=pos.x+'px';
// 	oDiv.style.top=pos.y+'px';

// }

// </script>
// <style>
// #div1{background: red;height: 200px;width: 200px;position: absolute;}
// </style>
// </head>
// <body style="height:2000px;">
// <div id="div1">
// </div>

// </body>
// </html>