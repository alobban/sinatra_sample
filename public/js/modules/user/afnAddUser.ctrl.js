/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        .controller('AfnAddUserCtrl', AfnAddUserCtrl)
    ;

    function AfnAddUserCtrl($scope, $http) {
        // var vm = this;
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user';

        $http({
            mehtod: 'POST',
            url: apiUrl
        }).success(function(data) {
            $scope.users = data;
            console.log($scope.users);
        });
    }
})();