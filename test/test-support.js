(function(ng) {

    if(!document.URL.match(/\?stub/)) {
        return; // do nothing special - this app is not gonna use stubbed backend
    }

    console.log('======== USING STUBBED BACKEND ========');
    initializeStubbedBackend();

    function initializeStubbedBackend() {
        ng.module('myApp')
            .config(function($provide) {
                $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
            })
            .run(function($httpBackend) {

                /* Repository Methods*/
                function getByName(array, propertyValue){
                    return getFirstByProperty(array, "name", propertyValue)
                }
                function getFirstByProperty(array, propertyName, propertyValue){
                    console.log("getFirstByProperty", array, propertyName, propertyValue)
                    return array.filter(function(it){return it[propertyName] === propertyValue})[0]
                }
                function paramMatcher(pattern) {
                    return function(url){
                        console.log(pattern, url, url.match(pattern))
                        return url.match(pattern)[1]
                    }
                }

                function routeMatch(pattern, url) {
                        return url.match(pattern)[1]
                }

                function ok(body){
                    return [200, body, []]
                }

                /* Repository Data*/
                repository = {
                    admin : [{name:"foo"}],
                    client : [{name: 'testClient', provisions:[]},{name: 'testClient2', provisions:[]}] ,
                    provider : [{name: 'auth'}]
                };

                /* Application passThroughs*/
                $httpBackend.whenGET(/^partials\//).passThrough();


                /* Generated Resources*/
                for(var resource in repository) (function(resource, pattern, collection){
                    //getAll
                    $httpBackend.whenGET(resource).respond(collection);

                    $httpBackend.whenGET(pattern).respond(function(method, url, data) {
                        return ok(getByName(collection, routeMatch(pattern,url)))
                    });
                }(resource, new RegExp(resource + '/(.*)'), repository[resource]));
            });
    }
})(angular);