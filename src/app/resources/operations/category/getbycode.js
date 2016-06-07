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
    .controller('CategoryGetByCodeCtrl', function CategoryGetByCodeCtrl(
      $scope, $state, $stateParams, OperationsModel, CategoriesModel) {
        var categoryGetByCodeCtrl = this;
        $scope.categoryCode = '';
        $scope.apiKey = '';

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callCategoryGetByCode() {
          CategoriesModel.getCategories($scope.categoryCode, $scope.apiKey)
              .success(function (category) {
                  if (category) {
                      categoryGetByCodeCtrl.category = category;
                  } else {
                      returnToOperations();
                  }
              });
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
