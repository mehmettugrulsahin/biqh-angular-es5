angular.module('apis', [
    'biqh.models.apis'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('biqh.apis', {
                url: '/',
                views: {
                    'apis@': {
                        controller: 'ApisListCtrl as apisListCtrl',
                        templateUrl: 'app/apis/apis.tmpl.html'
                    }
                }
            })
        ;
    })
    .controller('ApisListCtrl', function ApisListCtrl(ApisModel) {
        var apisListCtrl = this;

        ApisModel.getApis()
            .then(function (result) {
                apisListCtrl.apis = result;
            });
    })
;
