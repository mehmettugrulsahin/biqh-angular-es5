angular.module('MarketData', [
    'ngAnimate',
    'ngMaterial',
    'ui.router',
    'ngRedux',
    'resources',
    'resources.operations'
])
    .config(routerConfig)
    .config(reduxConfig);

reduxConfig.$inject = ['$ngReduxProvider'];

function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('marketdata', {
            url: '',
            abstract: true
        })
    ;

    $urlRouterProvider.otherwise('/');
}

function reduxConfig($ngReduxProvider) {
  $ngReduxProvider.createStoreWith({root: rootReducer});
}

function rootReducer(state, action) {
  if (angular.isUndefined(state)) {
    return {
      searchCategoryCode: 'DLG',
      searchApiKey: '00000000-0000-0000-0000-000000000000'
    };
  }

  switch (action.type) {
    case 'UPDATE_SEARCH_CATEGORY_CODE':
      state.searchCategoryCode = action.payload;
      break;
    case 'UPDATE_SEARCH_API_KEY':
      state.searchApiKey = action.payload;
      break;
  }

  return state;
}
