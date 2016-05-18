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
        $scope.show = showUser;

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
        
        function showUser(user) {
            $rootScope.user = user;
            $state.go('viewUser', {id: user.id});
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