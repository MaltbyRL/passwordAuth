'use strict';

var app = angular.module('ricksApp');



app.controller('registerCtrl', function($scope, authSvc) {
  $scope.register = function(user) {
    authSvc.register(user);
  };
});

app.service('authSvc', function($http, $state) {
  this.register = function(userObj) {
    $http.post('/users/register', userObj)
      .then(function(res) {
        $state.go('login');
      })
  };

});
