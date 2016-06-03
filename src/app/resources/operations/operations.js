angular.module('resources.operations', [
    'marketdata.models.resources',
    'marketdata.models.operations'
])
    .config(function ($stateProvider, $mdIconProvider) {
        $stateProvider
            .state('marketdata.resources.operations', {
                url: 'resources/:resource',
                views: {
                    'operations@': {
                        templateUrl: 'src/app/resources/operations/operations.tmpl.html',
                        controller: 'OperationsListCtrl as operationsListCtrl'
                    }
                }
            });
        $mdIconProvider.icon('share', './src/assets/svg/share.svg', 24);
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
