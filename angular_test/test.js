console.log(2);
var myApp=angular.module('myApp', []);
myApp.controller('myController',function($scope,$timeout){

  $scope.clock=2;
  var updateClock=function(){
    $scope.clock=new Date();
    $timeout(function(){
      updateClock();
    },1000);
  };
  updateClock();

});
