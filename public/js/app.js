(function() {
    'use strict';

angular
    .module('app', [
        'ui.router',
        'afnUser',
        'ngMessages'
    ])
    .config(['$urlRouterProvider','$stateProvider', function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/'
            })
            .state('users', {
                url: '/user',
                templateUrl: 'templates/users.html'
            })
            .state('addUser', {
                url: '/new',
                templateUrl: 'templates/addUser.html'
            })
            .state('editUser', {
                url: '/user/{id:int}',
                templateUrl: 'templates/editUser.html'
            })
            .state('viewUser', {
                url:'/view',
                templateUrl: 'templates/viewUser.html'
            })
            .state('deleteUser', {
                url: '/delete',
                templateUrl: 'templates/deleteUser.html'
            })
        ;
    }]);
})();