angular.module('resources.operations.mutualfundget', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.mutualfundget', {
                url: '/operations/:operationId/mutualfund/get',
                templateUrl: 'src/app/resources/operations/mutualfund/get.tmpl.html',
                controller: 'MutualFundGetCtrl as mutualFundGetCtrl'
            })
        ;
    })
    .controller('MutualFundGetCtrl', function MutualFundGetCtrl($state, $stateParams, OperationsModel) {
        var mutualFundGetCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callMutualFundGet() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    mutualFundGetCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        mutualFundGetCtrl.cancelCalling = cancelCalling;
        mutualFundGetCtrl.callMutualFundGet = callMutualFundGet;
    })
;
