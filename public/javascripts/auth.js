'use strict';

var app = angular.module('ricksApp', []);

app.controller('authCtrl', function($scope, authSvc) {
  console.log('authCtrl');
});




app.factory('httpRequestInterceptor', function() {
  return {
    request: function(config) {
      if (Auth.token) {
        config.headers = {
          'Authorization': "bearer " + Auth.token
        }
      }
      return config;
    }
  }
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});




app.service('authSvc', function($http, $state) {
  this.register = function(userObj) {
    $http.post('/users/register', userObj)
      .then(function(res) {
        $state.go('home');
      })
  };

});
