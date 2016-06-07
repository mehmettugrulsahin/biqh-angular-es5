angular.module('resources.operations.listingget', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.listingget', {
                url: '/operations/:operationId/listing/get',
                templateUrl: 'src/app/resources/operations/listing/get.tmpl.html',
                controller: 'ListingGetCtrl as listingGetCtrl'
            })
        ;
    })
    .controller('ListingGetCtrl', function ListingGetCtrl($state, $stateParams, OperationsModel) {
        var listingGetCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callListingGet() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    listingGetCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        listingGetCtrl.cancelCalling = cancelCalling;
        listingGetCtrl.callListingGet = callListingGet;
    })
;
