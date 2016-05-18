/**
 * Created by vagrant on 5/18/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        .controller('AfnViewUserCtrl', AfnViewUserCtrl)
    ;

    function AfnViewUserCtrl($rootScope, $http, $scope, $state) {
        var domain = 'http://localhost:9393';
        var apiUrl = domain + '/user/';
        $scope.user = $rootScope.user;
        $scope.returnToUsers = returnToUsers;
        $scope.editUser = editUser;
        $scope.deleteUser = deleteUser;

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

        // console.log(user);

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