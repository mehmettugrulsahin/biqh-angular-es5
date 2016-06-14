angular.module('resources.operations.categorygetbyidandcode', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.categorygetbyidandcode', {
                url: '/operations/:operationId/category/getbyidandcode',
                templateUrl: 'src/app/resources/operations/category/getbyidandcode.tmpl.html',
                controller: 'CategoryGetByIdAndCodeCtrl as categoryGetByIdAndCodeCtrl'
            })
        ;
    })
    .controller('CategoryGetByIdAndCodeCtrl', ['$scope', '$state', '$stateParams', 'OperationsModel', 'CategoriesModel', '$ngRedux', 'NgTableParams', 
      function($scope, $state, $stateParams, OperationsModel, CategoriesModel, $ngRedux, NgTableParams) {

      var categoryGetByIdAndCodeCtrl = this;

      var unsubscribe = $ngRedux.connect(function mapStateToCtrl(state) {
        return {
          searchListingId: state.root.searchListingId,
          searchCategoryCode: state.root.searchCategoryCode,
          searchApiKey: state.root.searchApiKey
        };
      }, {})(categoryGetByIdAndCodeCtrl);

      $scope.$on('$destroy', unsubscribe);

      function returnToOperations() {
          $state.go('marketdata.resources.operations', {
              resource: $stateParams.resource
          })
      }

      OperationsModel.getOperationById($stateParams.operationId)
          .then(function (operation) {
              if (operation) {
                  categoryGetByIdAndCodeCtrl.operation = operation;
              } else {
                  returnToOperations();
              }
          });

      function cancelCalling() {
          returnToOperations();
      }

      function callGetSubCategory() {
        CategoriesModel.getSubCategory($scope.searchListingId, $scope.searchCategoryCode, $scope.searchApiKey)
            .success(function (subCategories) {
                if (subCategories) {
                    categoryGetByIdAndCodeCtrl.subCategories = subCategories;
                    categoryGetByIdAndCodeCtrl.subCategoriesTableParams = new NgTableParams({}, { dataset: subCategories});
                    $ngRedux.dispatch({
                      type: 'SEARCH_CATEGORY_GETBYIDANDCODE', 
                      payload: {
                        "searchListingId": $scope.searchListingId, 
                        "searchCategoryCode": $scope.searchCategoryCode, 
                        "searchApiKey": $scope.searchApiKey
                      }
                    });
                } else {
                    returnToOperations();
                }
            });
      }

      categoryGetByIdAndCodeCtrl.cancelCalling = cancelCalling;
      categoryGetByIdAndCodeCtrl.callGetSubCategory = callGetSubCategory;

      $scope.searchListingId = categoryGetByIdAndCodeCtrl.searchListingId;
      $scope.searchCategoryCode = categoryGetByIdAndCodeCtrl.searchCategoryCode;
      $scope.searchApiKey = categoryGetByIdAndCodeCtrl.searchApiKey;    
    }])
;
