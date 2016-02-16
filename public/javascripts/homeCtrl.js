'use strict';

var app = angular.module('ricksApp');
// var mongoose = require('mongoose'),
//     User = require('./user');



app.controller('homeCtrl', function($scope, authSvc) {
  console.log("homeCtrl");
  $scope.register = function(user) {
    authSvc.register(user);
  };
});


app.service('authSvc', function($http, $state) {
  this.register = function(userObj) {
    $http.post('/users/register', userObj)
      .then(function(res) {
        $state.go('/');
      })
  };

});
