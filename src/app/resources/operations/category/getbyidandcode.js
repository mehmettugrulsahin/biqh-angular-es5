angular.module('resources.operations.categorygetbyidandcode', [

])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.categorygetbyidandcode', {
                url: '/operations/:operationId/category/getbyidandcode',
                templateUrl: 'src/app/resources/operations/category/getbyidandcode.tmpl.html',
                controller: 'CategoryGetByIdAndCodeCtrl as categoryGetByIdAndCodeCtrl'
            })
        ;
    })
    .controller('CategoryGetByIdAndCodeCtrl', function CategoryGetByIdAndCodeCtrl(
      $scope, $state, $stateParams, OperationsModel, CategoriesModel) {
        var categoryGetByIdAndCodeCtrl = this;

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        function callGetSubCategory() {
          CategoriesModel.callGetSubCategory($scope.listingId, $scope.categoryCode, $scope.apiKey)
              .success(function (subCategories) {
                  if (subCategories) {
                      categoryGetByIdAndCodeCtrl.subCategories = subCategories;
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
                    categoryGetByIdAndCodeCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        categoryGetByIdAndCodeCtrl.cancelCalling = cancelCalling;
        categoryGetByIdAndCodeCtrl.callGetSubCategory = callGetSubCategory;
    })
;
