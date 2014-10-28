(function(window,undefined){
  


  (21,94) 定义了一些变量和函数 jQuery=function(){};
  


  (96,283) 给Jquery对象，添加一些方法和属性
  
jQuery.fn=jQuery.prototype = {
	jquery:版本,
	constructor:修正指向问题,
	init（）：初始化和参数管理，
	selector ：存储选择字符串，
	length：this对象的长度，
	toArray（）：转数组，
	get（）：转原生集合，
	pushStack():JQ对象的入栈，
	each（）：遍历集合，
	ready（）：DOm加载的接口，
	slice（）：集合的截取，
	first（）：集合的第一项，
	last（）：集合的最后一项，
	map（）：返回新集合，
	end（）：返回集合前一个状态
	push():(内部使用)
	sort():(内部使用)
	splice():(内部使用)
};

  (285,347) extend :jQuery的继承方法
  (349,817) jQuery.extend():扩展工具方法
  (877,2856) Sizzle：复杂选择器的实现 eg$("div ul li+p input.class")
  (2880,3042) Callbacks: 回调对象：函数的统一管理
  (3043,3183) Deferred：延迟对象：对异步的统一管理
  (3184,3295) support：功能检测
  (3308,3652) data():数据缓存  
  (3653,3797) queue():队列管理 （入队）
              dequeue(): (出队)
  (3803,4299) attr() prop() val() addClass()等：对元素属性的操作
  (4300,5128) on() trigger() :事件操作的相关方法
  (5140,6057) DOM操作 ：添加 删除 获取 包装 Dom筛选
  (6058,6620) css():样式的操作 
  (6621,7854) 提交的数据和ajax(): Ajax() load() 跨域 
  (7855,8584) animate()：运动的方法()
  (8585,8792) offset() :位置与尺寸的方法
  (8804,8821) jQuery支持模块化的模式
  (8826) window.jQuery=window.$=jQuery;把jQuery这个方法提供接口给他人使用
    
}).(window);
