'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/dash.html', controller: 'dash'});
    $routeProvider.when('/:resourceName', {templateUrl: 'partials/resource.html', controller: 'resource'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);
