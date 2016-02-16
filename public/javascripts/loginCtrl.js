'use strict';

var app = angular.module('ricksApp');
var Token;
app.controller('loginCtrl', function($scope, loginSvc) {
  $scope.logmein = function(user) {
    console.log('logMeIn')
    loginSvc.logmein(user);
  };
});
app.service('loginSvc', function($http, $state) {
  this.logmein = function(userObj) {
    $http.post('/users/login', userObj)
      .then(function(res) {
        console.log("Token:",res)
        alert("Token set: " + res.data)
        var myEl = angular.element( document.querySelector( '#loginform' ) );
        myEl.remove();
        Token = res
      })
      .then(function(Token){

      })
  };
});
