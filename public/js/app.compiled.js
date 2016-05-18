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
            .state('editUser', {
                url: '/user/{id:int}',
                templateUrl: 'templates/editUser.html'
            })
            .state('viewUser', {
                url:'/view',
                templateUrl: 'templates/viewUser.html'
            })
        ;
    }]);
})();
/**
 * Created by vagrant on 5/13/16.
 */
(function(){
'use strict';
    
    angular
        .module('afn-user', []);
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

    function AfnUserController($scope, $http, $state, $rootScope, $window) {
        // var vm = this;
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';
        $scope.edit = edit;
        $scope.create = create;
        $scope.delete = deleteUser;

        function edit(user) {
            console.log(user);
            $rootScope.user = user;
            $state.go('editUser', {id: user.id});
        }

        function create() {
            $state.go('addUser');
        }

        function deleteUser(user) {
            $http.delete(apiUrl+'/'+user.id)
                .success(function(data) {
                    console.log(data);
                    $window.location.reload(true);
                })
                .error(function(data) {
                    console.log(data);
                    console.log('Error: Delete did not work!');
                })
            ;
        }

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
 * Created by vagrant on 5/18/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        .controller('AfnViewUserCtrl', AfnViewUserCtrl)
    ;

    function AfnViewUserCtrl($rootScope, $http, $scope) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain + '/user/';

        $http.get(apiUrl+$rootScope.user.id)
            .success(function(data) {
                console.log(data);
                console.log('View User works!');
            })
            .error(function(data) {
                console.log(data);
                console.log('View User does not Work!');
            })
        ;
    }
})();
/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        .controller('AfnAddUserCtrl', AfnAddUserCtrl)
    ;

    function AfnAddUserCtrl($rootScope, $http, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';
        var userJson = null;
        $rootScope.user = {};
        $rootScope.createUser = createUser;
        $rootScope.reset = reset;

        // console.log(JSON.stringify($rootScope.user));
        function mapFields(user) {
            return {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "gender": user.gender,
                "city": user.city,
                "state": user.state
            };
        }
        
        function createUser(user) {
            var userMapped = mapFields(user);
            userJson = JSON.stringify(userMapped);
            // userJson = userMapped;
            console.log(userJson);

            $http.post(apiUrl, userJson)
                .success(function(data) {
                    console.log('It works!');
                    console.log(data);
                    $state.go('users');
                }).error(function(data) {
                    console.log("Error: It's not working!");
                    console.log(error);
                })
            ;
        }
        
        function reset() {
            $rootScope.user = {};
        }
    }
})();
/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        // .config([$httpProvider], function($httpProvider) {
        //     $httpProvider.defaults.headers.put = 'Content-Type: text/plain';
        // })
        .controller('AfnEditUserCtrl', AfnEditUserCtrl)
    ;

    function AfnEditUserCtrl($http, $rootScope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user/';
        var userJson = null;
        $rootScope.updateUser = updateUser;
        $rootScope.cancel = cancelBtn;
        
        // console.log(JSON.stringify($rootScope.user));
        function mapFields(user) {
            return {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "gender": user.gender,
                "city": user.city,
                "state": user.state
            };
        }

        function updateUser(user) {
            var userMapped = mapFields(user);
            userJson = JSON.stringify(userMapped);
            // userJson = userMapped;
            console.log(userJson);
            
            $http.put(apiUrl+user.id, userJson)
                .success(function(response) {
                    console.log(response);
                    $state.go('users');
                }).error(function(error) {
                    console.log("Error: It's not working");
                    console.log(error);
                })
            ;
        }

        function cancelBtn() {
            $state.go('users');
        }
    }
})();