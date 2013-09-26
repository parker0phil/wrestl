'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var addservicefrom = angular.module('myApp.services', []);

addservicefrom.value('version', '0.1');
addservicefrom.factory('repository', function($http){
    return {
        getAll : function(resource){
            console.log(resource)
            return $http.get(resource).then(function(result) {
                console.log(result)
                return result.data;
            });
        },
        getOne : function(resource, identifier){

            return $http.get(resource+'/'+identifier).then(function(result) {
                return result.data;
            });
        }
    }
});
