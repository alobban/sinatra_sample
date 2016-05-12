angular
    .module('app', [
        'ui.router'
    ])
    .config(['$urlRouteProvider','$stateProvider', function($urlRouteProvider, $stateProvider) {
        $urlRouteProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'index.html'
            })
            .state('users', {
                url: '/user',
                templateUrl: 'templates/users.html'
            });
    }]);
