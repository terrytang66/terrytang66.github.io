 function getPagearea(){
    if (document.compatMode == "BackCompat"){
      return {
        width: Math.max(document.body.scrollWidth,
                document.body.clientWidth),
        height: Math.max(document.body.scrollHeight,
                document.body.clientHeight)
      }
    } else {
      return {
        width: Math.max(document.documentElement.scrollWidth,
                document.documentElement.clientWidth),
        height: Math.max(document.documentElement.scrollHeight,
                document.documentElement.clientHeight)
      }
    }



  }
  // 网页元素的相对位置就是
  // var X= this.getBoundingClientRect().left;
  // var Y =this.getBoundingClientRect().top;
  // 再加上滚动距离，就可以得到绝对位置
  // var X= this.getBoundingClientRect().left+document.documentElement.scrollLeft;
  // var Y =this.getBoundingClientRect().top+document.documentElement.scrollTop;
  // 目前，IE、Firefox 3.0+、Opera 9.5+都支持该方法，而Firefox 2.x、Safari、Chrome、Konqueror不支持。