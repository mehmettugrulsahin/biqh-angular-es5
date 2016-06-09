angular.module('resources', [
    'marketdata.models.resources'
])
    .config(function ($stateProvider) {
        $stateProvider
            .state('marketdata.resources', {
                url: '/',
                views: {
                    'resources@': {
                        controller: 'ResourcesListCtrl as resourcesListCtrl',
                        templateUrl: 'src/app/resources/resources.tmpl.html'
                    },
                    'operations@': {
                        controller: 'OperationsListCtrl as operationsListCtrl',
                        templateUrl: 'src/app/resources/operations/operations.tmpl.html'
                    }
                }
            })
        ;
    })
    .controller('ResourcesListCtrl', ['ResourcesModel', function(ResourcesModel) {
        var resourcesListCtrl = this;

        ResourcesModel.getResources()
            .then(function (result) {
                resourcesListCtrl.resources = result;
            });
    }])
;
