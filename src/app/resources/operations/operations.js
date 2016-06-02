angular.module('resources.operations', [
    'marketdata.models.resources',
    'marketdata.models.operations'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations', {
                url: 'resources/:resource',
                views: {
                    'operations@': {
                        templateUrl: 'app/resources/operations/operations.tmpl.html',
                        controller: 'OperationsListCtrl as operationsListCtrl'
                    }
                }
            })
        ;
    })
    .controller('OperationsListCtrl', function OperationsListCtrl($stateParams, ResourcesModel, OperationsModel) {
        var operationsListCtrl = this;

        ResourcesModel.setCurrentResource($stateParams.resource);

        OperationsModel.getOperations()
            .then(function (operations) {
                operationsListCtrl.operations = operations;
            });

        operationsListCtrl.getCurrentResource = ResourcesModel.getCurrentResource;
        operationsListCtrl.getCurrentResourceName = ResourcesModel.getCurrentResourceName;
    })

;
