angular.module('resources.operations.documentfilegetbyid', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.documentfilegetbyid', {
                url: '/operations/:operationId/documentfile/getbyid',
                templateUrl: 'src/app/resources/operations/documentfile/getbyid.tmpl.html',
                controller: 'DocumentGetByIdCtrl as documentGetByIdCtrl'
            })
        ;
    })
    .controller('DocumentGetByIdCtrl', ['$state', '$stateParams', 'OperationsModel', 
        function($state, $stateParams, OperationsModel) {

        var documentGetByIdCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callDocumentGetById() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    documentGetByIdCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        documentGetByIdCtrl.cancelCalling = cancelCalling;
        documentGetByIdCtrl.callDocumentGetById = callDocumentGetById;
    }])
;
