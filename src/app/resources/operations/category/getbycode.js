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
      $scope, $state, $stateParams, OperationsModel, CategoriesModel, $ngRedux) {
        var categoryGetByCodeCtrl = this;
        $scope.searchCategoryCode = '';
        $scope.searchApiKey = '';

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

        function callCategoryGetByCode() {
          CategoriesModel.getCategoryBycode($scope.searchCategoryCode, $scope.searchApiKey)
              .success(function (category) {
                  if (category) {
                      categoryGetByCodeCtrl.category = category;
                      $ngRedux.dispatch({type: 'UPDATE_SEARCH_CATEGORY_CODE', payload: $scope.searchCategoryCode});
                      $ngRedux.dispatch({type: 'UPDATE_SEARCH_API_KEY', payload: $scope.searchApiKey});
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

        $scope.searchCategoryCode = categoryGetByCodeCtrl.searchCategoryCode;
        $scope.searchApiKey = categoryGetByCodeCtrl.searchApiKey;
    })
;
