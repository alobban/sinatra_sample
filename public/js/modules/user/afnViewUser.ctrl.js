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
        $scope.returnToUsers = returnToUsers;
        $scope.editUser = editUser;
        $scope.deleteUser = deleteUser;
        
        function returnToUsers() {
            $state.go('users');
        }
        
        function editUser(user) {
            $rootScope.user = user;
            $state.go('editUser', {id: user.id});
        }
        
        function deleteUser(user) {
            $rootScope.user = user;
            $state.go('editUser', {id: user.id});
        }

        $http.get(apiUrl+user.id)
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