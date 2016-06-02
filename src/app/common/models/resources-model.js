angular.module('marketdata.models.resources', [])
    .service('ResourcesModel', function ($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'data/resources.json'
            },
            resources,
            currentResource;

        function extract(result) {
            return result.data;
        }

        function cacheResources(result) {
            resources = extract(result);
            return resources;
        }

        model.getResources = function() {
            return (resources) ? $q.when(resources) : $http.get(URLS.FETCH).then(cacheResources);
        };

        model.setCurrentResource = function(resource) {
            return model.getResourceByName(resource).then(function(resource) {
                currentResource = resource;
            })
        };

        model.getCurrentResource = function() {
            return currentResource;
        };

        model.getCurrentResourceName = function() {
            return currentResource ? currentResource.name : '';
        };

        model.getResourceByName = function(resourceName) {
            var deferred = $q.defer();

            function findResource(){
                return _.find(resources, function(o){
                    return o.name == resourceName;
                })
            }

            if(resources) {
                deferred.resolve(findResource());
            } else {
                model.getResources()
                    .then(function() {
                        deferred.resolve(findResource());
                    });
            }

            return deferred.promise;
        };
    })
;
