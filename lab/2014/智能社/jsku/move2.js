//比较完美的运动框架
function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }
    else{
        return getComputedStyle(obj,false)[name];
        }
}

function startMove(obj,json,fnEnd)//json实现值得同时改变
{   var timer=null;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var bStop=true;//假设所有值都已经到了
        for(var attr in json)
        { 
         var cur=0;
         if (attr =='opacity') {
            cur=Math.round(parseFloat(getStyle(obj,attr))*100);//四舍五入
         }else{
            cur=parseInt(getStyle(obj,attr));
         }

         var speed=(json[attr]-cur)/6;
         speed=speed>0?Math.ceil(speed):Math.floor(speed);
         if (cur!=json[attr]) bStop=false;
         // if(json[attr]==cur){
         //    clearInterval(obj.timer);
         //    if (fnEnd) fnEnd();
         // }
         // else{
            if (attr =='opacity') {
                obj.style.filter='alpha(opacity :'+(cur+speed)+')'; 
                obj.style.opacity=(cur+speed)/100;
            }else{
            obj.style[attr]=cur+speed+'px';}
         // }
        }
        if (bStop) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();

        }
    },30);                                                                                                                                                                                                                                                                             


}
