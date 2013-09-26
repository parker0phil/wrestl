'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/dash.html', controller: 'dash'});
    $routeProvider.when('/admin', {templateUrl: 'partials/admin.html', controller: 'admin'});
    $routeProvider.when('/client', {templateUrl: 'partials/client.html', controller: 'client'});
    $routeProvider.when('/provider', {templateUrl: 'partials/provider.html', controller: 'provider'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
