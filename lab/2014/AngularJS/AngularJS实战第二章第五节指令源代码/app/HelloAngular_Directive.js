var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: 'AEMC',//匹配模式
        template: '<div>Hi everyone!</div>',//模板  可以用templUrl：引入一个页面
        replace: true
    }
});