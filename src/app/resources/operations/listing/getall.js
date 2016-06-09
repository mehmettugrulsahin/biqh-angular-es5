angular.module('resources.operations.listinggetall', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.listinggetall', {
                url: '/operations/:operationId/listing/getall',
                templateUrl: 'src/app/resources/operations/listing/getall.tmpl.html',
                controller: 'ListingGetAllCtrl as listingGetAllCtrl'
            })
        ;
    })
    .controller('ListingGetAllCtrl', ['$scope', '$state', '$stateParams', 'OperationsModel', 'ListingsModel', '$ngRedux', 
      function($scope, $state, $stateParams, OperationsModel, ListingsModel, $ngRedux) {

        var listingGetAllCtrl = this;

        var unsubscribe = $ngRedux.connect(function mapStateToCtrl(state) {
          return {
            searchApiKey: state.root.searchApiKey
          };
        }, {})(listingGetAllCtrl);

        $scope.$on('$destroy', unsubscribe);

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    listingGetAllCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        function cancelCalling() {
            returnToOperations();
        }

        function callListingGetAll() {
          ListingsModel.getAll($scope.searchApiKey)
              .success(function (listings) {
                  if (listings) {
                      listingGetAllCtrl.listings = listings;
                      $ngRedux.dispatch({
                        type: 'SEARCH_LISTING_GETALL', 
                        payload: {
                          "searchApiKey": $scope.searchApiKey
                        }
                      });
                  } else {
                      returnToOperations();
                  }
              });
        }

        listingGetAllCtrl.cancelCalling = cancelCalling;
        listingGetAllCtrl.callListingGetAll = callListingGetAll;

        $scope.searchApiKey = listingGetAllCtrl.searchApiKey;    
    }])
;
