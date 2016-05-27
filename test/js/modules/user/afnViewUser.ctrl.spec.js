/**
 * Created by vagrant on 5/25/16.
 */

'use strict';

describe('AfnViewUserCtrl', function () {
    var getData = {
        "id": 3,
        "first_name": "James-Earl",
        "last_name": "Smith",
        "gender": "M",
        "city": "Peoria",
        "state": "IL"
    };

    var $rootScope;
    var $httpBackend;
    var $scope;
    var $state;
    var AfnAddUserCtrl;
    var apiUrl = 'http://localhost:9393/user';

    beforeEach(module('afnUser'));
    beforeEach(module('ui.router'));

    beforeEach(function () {
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $state = $injector.get('$state');
            AfnAddUserCtrl = $injector.get('$controller')('AfnViewUserCtrl', {
                $scope: $scope
            });
        });
    });
    
    beforeEach(function () {
        $scope.user = getData;

        spyOn($state, 'go');
    });
    
    describe('Return button clicked', function () {
        it('return to index page', function () {
            $scope.returnToUsers();
            
            expect($state.go).toHaveBeenCalledWith('users');
        });
    });

    describe('Edit button clicked', function () {
        it('return to index page', function () {
            $scope.editUser(getData);

            expect($state.go).toHaveBeenCalledWith('editUser', {id: 3});
        });
    });

    describe('Delete button clicked', function () {
        it('return to index page', function () {
            $scope.deleteUser(getData);

            expect($state.go).toHaveBeenCalledWith('deleteUser', {id: 3});
        });
    });

    
});
