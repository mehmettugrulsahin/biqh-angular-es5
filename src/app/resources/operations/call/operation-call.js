angular.module('resources.operations.call', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.call', {
                url: '/operations/:operationId/call',
                templateUrl: 'src/app/resources/operations/call/operation-call.tmpl.html',
                controller: 'CallOperationCtrl as callOperationCtrl'
            })
        ;
    })
    .controller('CallOperationCtrl', function CallOperationCtrl($state, $stateParams, OperationsModel) {
        var callOperationCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callOperation() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    callOperationCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        callOperationCtrl.cancelCalling = cancelCalling;
        callOperationCtrl.callOperation = callOperation;
    })
;
