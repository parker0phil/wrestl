'use strict';

/* Controllers */

function cap(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var add = angular.module('myApp.controllers', ['myApp.services']);

var entities = ['admin', 'provider','client'];

add.controller('dash', ['$scope', 'repository', function($scope, repository) {
    for (var entity in entities)(function(entity){
        repository.getAll(entity).then(function(data){$scope[entity+"s"] = data});
    })(entities[entity])
}]);

for (var entity in entities)(function(entity){
    add.controller(entity, ['$scope', 'repository', function($scope, repository) {
        $scope[entity+"s"] = repository.getAll(entity);

        $scope['select'+cap(entity)] = function(entityId){
            $scope['selected'+cap(entity)] = entityId;
            $scope[entity] = repository.getOne(entity, entityId)
        }
    }])
})(entities[entity])

