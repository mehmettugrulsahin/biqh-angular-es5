angular.module('biqh.models.apis', [

])
    .service('ApisModel', function ($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'data/apis.json'
            },
            apis,
            currentApi;

        function extract(result) {
            return result.data;
        }

        function cacheApis(result) {
            apis = extract(result);
            return apis;
        }

        model.getApis = function() {
            return (apis) ? $q.when(apis) : $http.get(URLS.FETCH).then(cacheApis);
        };

        model.setCurrentApi = function(api) {
            return model.getApiByName(api).then(function(api) {
                currentApi = api;
            })
        };

        model.getCurrentApi = function() {
            return currentApi;
        };

        model.getCurrentApiName = function() {
            return currentApi ? currentApi.name : '';
        };

        model.getApiByName = function(apiName) {
            var deferred = $q.defer();

            function findApi(){
                return _.find(apis, function(a){
                    return a.name == apiName;
                })
            }

            if(apis) {
                deferred.resolve(findApi());
            } else {
                model.getApis()
                    .then(function() {
                        deferred.resolve(findApi());
                    });
            }

            return deferred.promise;
        };
    })
;
