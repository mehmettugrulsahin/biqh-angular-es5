angular.module('resources.operations.mutualfundget', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources.operations.mutualfundget', {
                url: '/operations/:operationId/mutualfund/get',
                templateUrl: 'src/app/resources/operations/mutualfund/get.tmpl.html',
                controller: 'MutualFundGetCtrl as mutualFundGetCtrl'
            })
        ;
    })
    .controller('MutualFundGetCtrl', ['$scope', '$state', '$stateParams', 'OperationsModel', 'MutualFundModel', '$ngRedux', function(
        $scope, $state, $stateParams, OperationsModel, MutualFundModel, $ngRedux) {

        var mutualFundGetCtrl = this;

        var unsubscribe = $ngRedux.connect(function mapStateToCtrl(state) {
          return {
            searchListingId: state.root.searchListingId, 
            searchApiKey: state.root.searchApiKey
          };
        }, {})(mutualFundGetCtrl);

        $scope.$on('$destroy', unsubscribe);

        function returnToOperations() {
            $state.go('marketdata.resources.operations', {
                resource: $stateParams.resource
            })
        }

        OperationsModel.getOperationById($stateParams.operationId)
            .then(function (operation) {
                if (operation) {
                    mutualFundGetCtrl.operation = operation;
                } else {
                    returnToOperations();
                }
            });

        function cancelCalling() {
            returnToOperations();
        }

        function callMutualFundGet() {
          MutualFundModel.get($scope.searchListingId, $scope.searchApiKey)
              .success(function (mutualfund) {
                  if (mutualfund) {
                      mutualFundGetCtrl.mutualfund = mutualfund;
                      $ngRedux.dispatch({
                        type: 'SEARCH_MUTUALFUND_GET', 
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

        mutualFundGetCtrl.cancelCalling = cancelCalling;
        mutualFundGetCtrl.callMutualFundGet = callMutualFundGet;

        $scope.searchListingId = mutualFundGetCtrl.searchListingId;
        $scope.searchApiKey = mutualFundGetCtrl.searchApiKey;        
    }])
;
