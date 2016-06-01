angular.module('Biqh', [
    'ngAnimate',
    'ui.router',
    'apis',
])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('biqh', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
    })
;
