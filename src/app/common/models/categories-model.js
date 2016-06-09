angular.module('marketdata.models.categories', [])
    .service('CategoriesModel', ['$http', '$q', function($http, $q) {
        var model = this,
            URLS = {
                GetByCode: 'https://accapi.biqh.nl:443/marketdata/v1/Category/GetByCode?',
                GetSubCategory: 'https://accapi.biqh.nl:443/marketdata/v1/Category/GetSubCategoryByShareCompanyListingIdAndCategoryCode?'
            },
            category,
            subCategories;

        function extract(result) {
            return result.data;
        }

        function cacheCategory(result) {
            category = extract(result);
            return category;
        }

        function cacheSubCategories(result) {
            subCategories = extract(result);
            return subCategories;
        }

        model.getCategoryBycode = function (categoryCode, apiKey) {
            return (category)
              ? $q.when(category)
              : $http.get(URLS.GetByCode + 'code=' + categoryCode + '&api_key=' + apiKey)
                .success(function (result) {
                  cacheCategory = result;
                });
        };

        model.getSubCategory = function (listingId, categoryCode, apiKey) {
          return (subCategories)
            ? $q.when(subCategories)
            : $http.get(URLS.GetSubCategory + 'sharecompanyListingId=' + listingId + '&categoryCode=' + categoryCode + '&api_key=' + apiKey)
              .success(function (result) {
                cacheSubCategories = result;
              });
        };
    }])
;
