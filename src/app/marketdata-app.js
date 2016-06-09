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
      searchCategoryId: '',
      searchListingId: '',
      searchCategoryCode: '',
      searchApiKey: ''
    };
  }

  switch (action.type) {
    case 'SEARCH_CATEGORY_GETBYCODE':
      state.searchCategoryCode = action.payload.searchCategoryCode;
      state.searchApiKey = action.payload.searchApiKey;
      break;
    case 'SEARCH_CATEGORY_GETBYIDANDCODE':
      state.searchListingId = action.payload.searchListingId;
      state.searchCategoryCode = action.payload.searchCategoryCode;
      state.searchApiKey = action.payload.searchApiKey;
      break;
    case 'SEARCH_LISTING_GETALL':
      state.searchApiKey = action.payload.searchApiKey;
      break;
    case 'SEARCH_LISTING_GET':
      state.searchListingId = action.payload.searchListingId;
      state.searchApiKey = action.payload.searchApiKey;
      break;
    case 'SEARCH_LISTING_GETBYCATEGORYID':
      state.searchCategoryId = action.payload.searchCategoryId;
      state.searchApiKey = action.payload.searchApiKey;
      break;
    case 'SEARCH_MUTUALFUND_GET':
      state.searchListingId = action.payload.searchListingId;
      state.searchApiKey = action.payload.searchApiKey;
      break;
  }

  return state;
}
