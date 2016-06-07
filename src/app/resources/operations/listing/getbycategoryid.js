angular.module('resources.operations.listinggetbycategoryid', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.listinggetbycategoryid', {
                url: '/operations/:operationId/listing/getbycategoryid',
                templateUrl: 'src/app/resources/operations/listing/getbycategoryid.tmpl.html',
                controller: 'ListingGetByCategoryIdCtrl as listingGetByCategoryIdCtrl'
            })
        ;
    })
    .controller('ListingGetByCategoryIdCtrl', function ListingGetByCategoryIdCtrl($state, $stateParams, OperationsModel) {
        var listingGetByCategoryIdCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callListingGetByCategoryId() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    listingGetByCategoryIdCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        listingGetByCategoryIdCtrl.cancelCalling = cancelCalling;
        listingGetByCategoryIdCtrl.callListingGetByCategoryId = callListingGetByCategoryId;
    })
;
