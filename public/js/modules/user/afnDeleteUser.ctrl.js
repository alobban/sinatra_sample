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