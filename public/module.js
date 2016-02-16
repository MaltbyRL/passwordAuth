'use strict';

var app = angular.module('ricksApp', ['ui.router']);
console.log("module.js")

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {url: '/', templateUrl: './partials/home.html', controller: 'homeCtrl'})
    .state('login', {url: '/login', templateUrl: './partials/login.html', controller: 'loginCtrl'})
    .state('register', {url: '/register', templateUrl: './partials/register.html', controller: 'registerCtrl'})

  $urlRouterProvider.otherwise('/');
});
