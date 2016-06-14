angular.module('resources.operations.categorygetbycode', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.categorygetbycode', {
                url: '/operations/:operationId/category/getbycode',
                templateUrl: 'src/app/resources/operations/category/getbycode.tmpl.html',
                controller: 'CategoryGetByCodeCtrl as categoryGetByCodeCtrl'
            })
        ;
    })
    .controller('CategoryGetByCodeCtrl', ['$scope', '$state', '$stateParams', 'OperationsModel', 'CategoriesModel', '$ngRedux', 'NgTableParams', 
      function($scope, $state, $stateParams, OperationsModel, CategoriesModel, $ngRedux, NgTableParams) {

      var categoryGetByCodeCtrl = this;

      var unsubscribe = $ngRedux.connect(function mapStateToCtrl(state) {
        return {
          searchCategoryCode: state.root.searchCategoryCode,
          searchApiKey: state.root.searchApiKey
        };
      }, {})(categoryGetByCodeCtrl);

      $scope.$on('$destroy', unsubscribe);

      function returnToOperations() {
          $state.go('marketdata.resources.operations', {
              resource: $stateParams.resource
          })
      }

      OperationsModel.getOperationById($stateParams.operationId)
          .then(function (operation) {
              if (operation) {
                  categoryGetByCodeCtrl.operation = operation;
              } else {
                  returnToOperations();
              }
          });

      function cancelCalling() {
          returnToOperations();
      }

      function callCategoryGetByCode() {
        CategoriesModel.getCategoryBycode($scope.searchCategoryCode, $scope.searchApiKey)
            .success(function (category) {
                if (category) {
                    categoryGetByCodeCtrl.category = category;
                    categoryGetByCodeCtrl.categoriesTableParams = new NgTableParams({}, { dataset: category.Categories});
                    $ngRedux.dispatch({
                      type: 'SEARCH_CATEGORY_GETBYCODE', 
                      payload: {
                        "searchCategoryCode": $scope.searchCategoryCode, 
                        "searchApiKey": $scope.searchApiKey
                      }
                    });
                } else {
                    returnToOperations();
                }
            });
      }

      categoryGetByCodeCtrl.cancelCalling = cancelCalling;
      categoryGetByCodeCtrl.callCategoryGetByCode = callCategoryGetByCode;

      $scope.searchCategoryCode = categoryGetByCodeCtrl.searchCategoryCode;
      $scope.searchApiKey = categoryGetByCodeCtrl.searchApiKey;
    }])
;
