(function() {
    'use strict';

angular
    .module('app', [
        'ui.router',
        'afn-user'
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
        ;
    }]);
})();
/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        .controller('AfnUserController', AfnUserController)
    ;

    function AfnUserController($scope, $http) {
        // var vm = this;
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';

        $http({
            mehtod: 'GET',
            url: apiUrl
        }).success(function(data) {
            $scope.users = data;
            console.log($scope.users);
        });
    }
})();
/**
 * Created by vagrant on 5/13/16.
 */
(function(){
'use strict';
    
    angular
        .module('afn-user', []);
})();