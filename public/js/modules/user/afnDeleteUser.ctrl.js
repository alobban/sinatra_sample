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
                    $scope.status = "Deleting...";
                    $state.go('users');
                })
                .error(function(data) {
                    $scope.status = "Failed...";
                })
            ;
        }

        function cancelBtn() {
            $state.go('users');
        }
    }
})();