(function() {
    'use strict';

angular
    .module('app', [
        'ui.router',
        'afnUser'
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
/**
 * Created by vagrant on 5/13/16.
 */
(function(){
'use strict';
    
    angular
        .module('afnUser', []);
})();
/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afnUser')
        .controller('AfnUserController', AfnUserController)
    ;

    function AfnUserController($scope, $http, $state, $rootScope) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';
        $scope.edit = edit;
        $scope.create = create;
        $scope.delete = deleteUser;
        $scope.show = showUser;

        function edit(user) {
            $rootScope.user = user;
            $state.go('editUser', {id: user.id});
        }

        function create() {
            $state.go('addUser');
        }

        function deleteUser(user) {
            $rootScope.user = user;
            $state.go('deleteUser', {id: user.id});
        }

        function showUser(user) {
            $rootScope.user = user;
            $state.go('viewUser', {id: user.id});
        }

        $http.get(apiUrl)
            .success(function(data) {
            $scope.users = data;
        });
    }
})();
/**
 * Created by vagrant on 5/18/16.
 */

(function() {
    'use strict';

    angular
        .module('afnUser')
        .controller('AfnViewUserCtrl', AfnViewUserCtrl)
    ;

    function AfnViewUserCtrl($rootScope, $http, $scope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain + '/user/';
        $scope.user = $rootScope.user;
        $scope.returnToUsers = returnToUsers;
        $scope.editUser = editUser;
        $scope.deleteUser = deleteUser;
        $rootScope.returnToUsers = cancelBtn;

        console.log($rootScope.user);
        
        function returnToUsers() {
            $state.go('users');
        }
        
        function editUser(user) {
            $rootScope.user = user;
            $state.go('editUser', {id: user.id});
        }
        
        function deleteUser(user) {
            $rootScope.user = user;
            $state.go('deleteUser', {id: user.id});
        }

        function cancelBtn() {
            $state.go('users');
        }

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
        .module('afnUser')
        .controller('AfnAddUserCtrl', AfnAddUserCtrl)
    ;

    function AfnAddUserCtrl($rootScope, $http, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';
        var userJson = null;
        $rootScope.user = {};
        $rootScope.createUser = createUser;
        $rootScope.reset = reset;
        
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
            console.log(userJson);

            $http.post(apiUrl, userJson)
                .success(function(data) {
                    console.log('It works!');
                    console.log(data);
                    $state.go('users');
                }).error(function(error) {
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
        .module('afnUser')
        .controller('AfnEditUserCtrl', AfnEditUserCtrl)
    ;

    function AfnEditUserCtrl($http, $rootScope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user/';
        var userJson = null;
        $rootScope.updateUser = updateUser;
        $rootScope.cancel = cancelBtn;
        
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
/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afnUser')
        .controller('AfnDeleteUserCtrl', AfnDeleteUserCtrl)
    ;

    function AfnDeleteUserCtrl($http, $rootScope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user/';
        $rootScope.deleteUser = deleteUser;
        $rootScope.returnToUsers = cancelBtn;

        function deleteUser(user) {
            $http.delete(apiUrl+user.id)
                .success(function(data) {
                    console.log(data);
                    $state.go('user');
                })
                .error(function(data) {
                    console.log(data);
                    console.log('Error: Delete did not work!');
                })
            ;
        }

        function cancelBtn() {
            $state.go('users');
        }
    }
})();