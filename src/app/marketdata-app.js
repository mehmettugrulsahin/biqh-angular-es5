angular.module('MarketData', [
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'resources',
    'resources.operations'
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('marketdata', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
    })
;
