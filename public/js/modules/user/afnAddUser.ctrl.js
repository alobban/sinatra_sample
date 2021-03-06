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