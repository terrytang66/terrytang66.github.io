var myModule = angular.module("MyModule", []);
myModule.directive("alll", function() {
    return {
        restrict: 'E',
        template: '<div>Hi everyone!</div>',
        replace: true
    }
});