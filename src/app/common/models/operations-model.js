angular.module('marketdata.models.operations', [])
    .service('OperationsModel', function ($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'data/operations.json'
            },
            operations;

        function extract(result) {
            return result.data;
        }

        function cacheOperations(result) {
            operations = extract(result);
            return operations;
        }

        function findOperation(operationId) {
            return _.find(operations, function (operation) {
                return operation.id === parseInt(operationId, 10);
            })
        }

        model.getOperations = function () {
            return (operations) ? $q.when(operations) : $http.get(URLS.FETCH).then(cacheOperations);
        };

        model.getOperationById = function (operationId) {
            var deferred = $q.defer();
            if (operations) {
                deferred.resolve(findOperation(operationId))
            } else {
                model.getOperations().then(function () {
                    deferred.resolve(findOperation(operationId))
                })
            }
            return deferred.promise;
        };
    })
;
