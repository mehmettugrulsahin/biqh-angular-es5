angular.module('marketdata.models.mutualfund', [])
    .service('MutualFundModel', function ($http, $q) {
        var model = this,
            URLS = {
                Get: 'https://accapi.biqh.nl:443/marketdata/v1/MutualFund/Get?'
            },
            mutualfund;

        function extract(result) {
            return result.data;
        }

        function cacheMutualFund(result) {
            mutualfund = extract(result);
            return mutualfund;
        }

        model.get = function (listingId, apiKey) {
          return (mutualfund)
            ? $q.when(mutualfund)
            : $http.get(URLS.Get + 'shareCompanyListingId=' + listingId + '&api_key=' + apiKey)
              .success(function (result) {
                cacheMutualFund = result;
              });
        };
    })
;
