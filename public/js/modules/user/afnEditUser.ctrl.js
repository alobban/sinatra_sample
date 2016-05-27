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
            // console.log(userJson);
            
            $http.put(apiUrl+user.id, userJson)
                .success(function(response) {
                    $scope.status = 'Updating...';
                    $state.go('users');
                }).error(function(error) {
                    $scope.status = 'Failed...';
                    // console.log(error);
                })
            ;
        }

        function cancelBtn() {
            $state.go('users');
        }
    }
})();