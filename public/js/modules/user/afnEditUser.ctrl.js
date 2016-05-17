/**
 * Created by vagrant on 5/13/16.
 */

(function() {
    'use strict';

    angular
        .module('afn-user')
        .controller('AfnEditUserCtrl', AfnEditUserCtrl)
    ;

    function AfnEditUserCtrl($scope, $http) {
        // var vm = this;
        var domain = 'http://localhost:9393';
        var apiUrl = domain+'/user/:id';

        $http({
            mehtod: 'PUT',
            url: apiUrl
        }).success(function(data) {
            $scope.users = data;
            console.log($scope.users);
        });
    }
})();