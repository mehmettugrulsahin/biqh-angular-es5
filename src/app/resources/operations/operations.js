angular.module('resources.operations', [
    'resources.operations.categorygetbycode',
    'resources.operations.categorygetbyidandcode',
    'resources.operations.documentfilegetbyid',
    'resources.operations.listinggetall',
    'resources.operations.listingget',
    'resources.operations.listinggetbycategoryid',
    'resources.operations.mutualfundget',
    'marketdata.models.resources',
    'marketdata.models.operations',
    'marketdata.models.categories', 
    'marketdata.models.listings', 
    'marketdata.models.mutualfund'
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
    .controller('OperationsListCtrl', function OperationsListCtrl($state, $stateParams, ResourcesModel, OperationsModel) {
        var operationsListCtrl = this;

        ResourcesModel.setCurrentResource($stateParams.resource);

        OperationsModel.getOperations()
            .then(function (operations) {
                operationsListCtrl.operations = operations;
            });

        function callOperation(operation) {
          switch (operation.absolutename) {
            case 'Category_GetByCode':
              $state.go('marketdata.resources.operations.categorygetbycode', {
                operationId: operation.id
              })
              break;
            case 'Category_GetSubCategory':
              $state.go('marketdata.resources.operations.categorygetbyidandcode', {
                operationId: operation.id
              })
              break;
            case 'DocumentFile_GetById':
              $state.go('marketdata.resources.operations.documentfilegetbyid', {
                operationId: operation.id
              })
              break;
            case 'Listing_GetAll':
              $state.go('marketdata.resources.operations.listinggetall', {
                operationId: operation.id
              })
              break;
            case 'Listing_Get':
              $state.go('marketdata.resources.operations.listingget', {
                operationId: operation.id
              })
              break;
            case 'Listing_GetByCategoryId':
              $state.go('marketdata.resources.operations.listinggetbycategoryid', {
                operationId: operation.id
              })
              break;
            case 'MutualFund_Get':
              $state.go('marketdata.resources.operations.mutualfundget', {
                operationId: operation.id
              })
              break;
          }
        }

        operationsListCtrl.getCurrentResource = ResourcesModel.getCurrentResource;
        operationsListCtrl.getCurrentResourceName = ResourcesModel.getCurrentResourceName;
        operationsListCtrl.callOperation = callOperation;
    });
