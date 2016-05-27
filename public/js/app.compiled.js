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
        // $scope.user = $rootScope.user;
        $scope.returnToUsers = returnToUsers;
        $scope.editUser = editUser;
        $scope.deleteUser = deleteUser;
        // $scope.returnToUsers = cancelBtn;

        // console.log($rootScope.user.id);
        
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
        //
        // function cancelBtn() {
        //     $state.go('users');
        // }

        // $http.get(apiUrl+$scope.user.id)
        //     .success(function(data) {
        //         console.log(data);
        //         console.log('View User works!');
        //     })
        //     .error(function(data) {
        //         console.log(data);
        //         console.log('View User does not Work!');
        //     })
        // ;
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

    function AfnAddUserCtrl($http, $state, $scope) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';
        var userJson = null;
        $scope.user = {};
        $scope.createUser = createUser;
        $scope.reset = reset;

        $scope.mapFields = function(user) {
            return {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "gender": user.gender,
                "city": user.city,
                "state": user.state
            };
        };
        
        function createUser(user) {
            var userMapped = $scope.mapFields(user);
            userJson = JSON.stringify(userMapped);
            
            $http.post(apiUrl, userJson)
                .success(function(data) {
                    $scope.status = "Saving...";
                    $state.go('users');
                }).error(function() {
                    $scope.status = "Failed...";
                })
            ;
        }
        
        function reset() {
            $scope.user = {};
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

    function AfnEditUserCtrl($http, $scope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user/';
        var userJson = null;
        $scope.updateUser = updateUser;
        $scope.cancel = cancelBtn;

        $scope.mapFields = function(user) {
            return {
                "first_name": user.first_name,
                "last_name": user.last_name,
                "gender": user.gender,
                "city": user.city,
                "state": user.state
            };
        };

        function updateUser(user) {
            var userMapped = $scope.mapFields(user);
            userJson = JSON.stringify(userMapped);
            
            $http.put(apiUrl+user.id, userJson)
                .success(function(response) {
                    $scope.status = 'Updating...';
                    $state.go('users');
                }).error(function(error) {
                    $scope.status = 'Failed...';
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

    function AfnDeleteUserCtrl($http, $scope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user/';
        $scope.deleteUser = deleteUser;
        $scope.returnToUsers = cancelBtn;

        function deleteUser(user) {
            $http.delete(apiUrl+user.id)
                .success(function(data) {
                    console.log(data);
                    $state.go('users');
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