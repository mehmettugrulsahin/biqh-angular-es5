angular.module('resources.operations.listingget', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.listingget', {
                url: '/operations/:operationId/listing/get',
                templateUrl: 'src/app/resources/operations/listing/get.tmpl.html',
                controller: 'ListingGetCtrl as listingGetCtrl'
            })
        ;
    })
    .controller('ListingGetCtrl', ['$scope', '$state', '$stateParams', 'OperationsModel', 'ListingsModel', '$ngRedux', 
      function($scope, $state, $stateParams, OperationsModel, ListingsModel, $ngRedux) {

        var listingGetCtrl = this;

        var unsubscribe = $ngRedux.connect(function mapStateToCtrl(state) {
          return {
            searchListingId: state.root.searchListingId, 
            searchApiKey: state.root.searchApiKey
          };
        }, {})(listingGetCtrl);

        $scope.$on('$destroy', unsubscribe);

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    listingGetCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });
    
        function cancelCalling() {
            returnToOperations();
        }

        function callListingGet() {
          ListingsModel.get($scope.searchListingId, $scope.searchApiKey)
              .success(function (listing) {
                  if (listing) {
                      listingGetCtrl.listing = listing;
                      $ngRedux.dispatch({
                        type: 'SEARCH_LISTING_GET', 
                        payload: {
                          "searchListingId": $scope.searchListingId,
                          "searchApiKey": $scope.searchApiKey
                        }
                      });
                  } else {
                      returnToOperations();
                  }
              });
        }

        listingGetCtrl.cancelCalling = cancelCalling;
        listingGetCtrl.callListingGet = callListingGet;

        $scope.searchListingId = listingGetCtrl.searchListingId;
        $scope.searchApiKey = listingGetCtrl.searchApiKey;
    }])
;
