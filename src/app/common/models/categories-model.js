angular.module('marketdata.models.categories', [])
    .service('CategoriesModel', function ($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'https://accapi.biqh.nl:443/marketdata/v1/Category/GetByCode?code='
            },
            categories;

        function extract(result) {
            return result.data;
        }

        function cacheCategories(result) {
            categories = extract(result);
            return categories;
        }

        function findCategory(categoryId) {
            return _.find(categories, function (category) {
                return category.Id === parseInt(categoryId, 10);
            })
        }

        model.getCategories = function (categoryCode, apiKey) {
            return (categories)
              ? $q.when(categories)
              : $http.get(URLS.FETCH + categoryCode + '&api_key=' + apiKey)
                .success(function (result) {
                  cacheCategories = result;
                });
        };

        model.getCategoryById = function (categoryId) {
            var deferred = $q.defer();
            if (categories) {
                deferred.resolve(findCategory(categoryId))
            } else {
                model.getCategories().then(function () {
                    deferred.resolve(findCategory(categoryId))
                })
            }
            return deferred.promise;
        };
    })
;
