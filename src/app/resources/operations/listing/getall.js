angular.module('resources.operations.listinggetall', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.listinggetall', {
                url: '/operations/:operationId/listing/getall',
                templateUrl: 'src/app/resources/operations/listing/getall.tmpl.html',
                controller: 'ListingGetAllCtrl as listingGetAllCtrl'
            })
        ;
    })
    .controller('ListingGetAllCtrl', function ListingGetAllCtrl($state, $stateParams, OperationsModel) {
        var listingGetAllCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callListingGetAll() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    listingGetAllCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        listingGetAllCtrl.cancelCalling = cancelCalling;
        listingGetAllCtrl.callListingGetAll = callListingGetAll;
    })
;
