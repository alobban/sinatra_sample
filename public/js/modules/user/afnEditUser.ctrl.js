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