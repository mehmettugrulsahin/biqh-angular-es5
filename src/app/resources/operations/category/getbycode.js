angular.module('resources.operations.categorygetbycode', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.categorygetbycode', {
                url: '/operations/:operationId/category/getbycode',
                templateUrl: 'src/app/resources/operations/category/getbycode.tmpl.html',
                controller: 'CategoryGetByCodeCtrl as categoryGetByCodeCtrl'
            })
        ;
    })
    .controller('CategoryGetByCodeCtrl', function CategoryGetByCodeCtrl($state, $stateParams, OperationsModel) {
        var categoryGetByCodeCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callCategoryGetByCode() {

        }

        function cancelCalling() {
            returnToOperations();
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    categoryGetByCodeCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        categoryGetByCodeCtrl.cancelCalling = cancelCalling;
        categoryGetByCodeCtrl.callCategoryGetByCode = callCategoryGetByCode;
    })
;
