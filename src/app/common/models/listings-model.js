angular.module('marketdata.models.listings', [])
    .service('ListingsModel', function ($http, $q) {
        var model = this,
            URLS = {
                GetAll: 'https://accapi.biqh.nl:443/marketdata/v1/Listing/GetAll?',
                Get: 'https://accapi.biqh.nl:443/marketdata/v1/Listing/Get?',
            },
            listings, 
            listing;

        function extract(result) {
            return result.data;
        }

        function cacheListings(result) {
            listings = extract(result);
            return listings;
        }

        function cacheListing(result) {
            listing = extract(result);
            return listing;
        }

        model.getAll = function (apiKey) {
            return (listings)
              ? $q.when(listings)
              : $http.get(URLS.GetAll + 'api_key=' + apiKey)
                .success(function (result) {
                  cacheListings = result;
                });
        };

        model.get = function (listingId, apiKey) {
          return (listing)
            ? $q.when(listing)
            : $http.get(URLS.Get + 'sharecompanyListingId=' + listingId + '&api_key=' + apiKey)
              .success(function (result) {
                cacheListing = result;
              });
        };        
    })
;
