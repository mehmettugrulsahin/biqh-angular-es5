angular.module('resources.operations.listinggetbycategoryid', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.listinggetbycategoryid', {
                url: '/operations/:operationId/listing/getbycategoryid',
                templateUrl: 'src/app/resources/operations/listing/getbycategoryid.tmpl.html',
                controller: 'ListingGetByCategoryIdCtrl as listingGetByCategoryIdCtrl'
            })
        ;
    })
    .controller('ListingGetByCategoryIdCtrl', ['$scope', '$state', '$stateParams', 'OperationsModel', 'ListingsModel', '$ngRedux', 
      function($scope, $state, $stateParams, OperationsModel, ListingsModel, $ngRedux) {

        var listingGetByCategoryIdCtrl = this;

        var unsubscribe = $ngRedux.connect(function mapStateToCtrl(state) {
          return {
            searchCategoryId: state.root.searchCategoryId, 
            searchApiKey: state.root.searchApiKey
          };
        }, {})(listingGetByCategoryIdCtrl);

        $scope.$on('$destroy', unsubscribe);

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    listingGetByCategoryIdCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        function cancelCalling() {
            returnToOperations();
        }

        function callListingGetByCategoryId() {
          ListingsModel.getbycategoryid($scope.searchCategoryId, $scope.searchApiKey)
              .success(function (listings) {
                  if (listings) {
                      listingGetByCategoryIdCtrl.listings = listings;
                      $ngRedux.dispatch({
                        type: 'SEARCH_LISTING_GETBYCATEGORYID', 
                        payload: {
                          "searchCategoryId": $scope.searchCategoryId,
                          "searchApiKey": $scope.searchApiKey
                        }
                      });
                  } else {
                      returnToOperations();
                  }
              });
        }

        listingGetByCategoryIdCtrl.cancelCalling = cancelCalling;
        listingGetByCategoryIdCtrl.callListingGetByCategoryId = callListingGetByCategoryId;

        $scope.searchCategoryId = listingGetByCategoryIdCtrl.searchCategoryId;
        $scope.searchApiKey = listingGetByCategoryIdCtrl.searchApiKey;        
    }])
;
