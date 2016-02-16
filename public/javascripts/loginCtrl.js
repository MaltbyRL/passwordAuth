'use strict';

var app = angular.module('ricksApp');

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
        $state.go('home');
      })
  };
});
