'use strict';


/* This is the model that will be built dynamically in the future */
var resources = [{name:'client'},{name:'provider'},{name:'admin'}];

/* Controllers */
var add = angular.module('myApp.controllers', ['myApp.services']);

add.controller('nav', ['$scope', function($scope) {
    $scope["resources"] = resources
}]);

add.controller('resource', ['$scope', 'repository', '$routeParams', function($scope, repository, $routeParams) {
    var resourceName = $routeParams.resourceName;
    $scope["resourceName"] = resourceName;
    $scope["entities"] = repository.getAll(resourceName);

    $scope["selectEntity"] = function(entityId){
        $scope["selectedEntity"] = entityId;
        $scope["entity"] = repository.getOne(resourceName, entityId)
    }
}]);


