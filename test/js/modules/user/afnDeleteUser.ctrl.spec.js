/**
 * Created by vagrant on 5/25/16.
 */

'use strict';

describe('AfnDeleteUserCtrl', function () {
    var userObj = {
        id: 3,
        first_name: "James-Earl",
        last_name: "Smith",
        gender: "M",
        city: "Peoria",
        state: "IL"
    };

    var $rootScope;
    var $httpBackend;
    var $scope;
    var $state;
    var AfnAddUserCtrl;
    var apiUrl = 'http://localhost:9393/user/';

    beforeEach(module('afnUser'));
    beforeEach(module('ui.router'));

    beforeEach(function () {
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $state = $injector.get('$state');
            AfnAddUserCtrl = $injector.get('$controller')('AfnDeleteUserCtrl', {
                $scope: $scope
            });
        });

        // spyOn($scope, 'deleteUser');
        spyOn($state, 'go');
        $scope.user = userObj;
    });

    describe('Cancel button clicked', function () {
        it('sets the user object to an empty object', function () {
            $scope.returnToUsers();

            expect($state.go).toHaveBeenCalledWith('users');
        });
    });

    describe('delete button clicked', function () {

        describe('when DELETE request is successful', function () {
            beforeEach(function () {
                $httpBackend.whenDELETE(apiUrl+$scope.user.id).respond(204);
                
                $scope.deleteUser(userObj);
                $httpBackend.flush();
            });

            it('routes to index', function () {
                expect($state.go).toHaveBeenCalledWith('users');
            });

            it('has a Success status', function () {
                expect($scope.status).toBe('Deleting...');
            });
        });

        describe('when DELETE request is unsuccessful', function () {
            beforeEach(function () {
                $httpBackend.whenDELETE(apiUrl+$scope.user.id).respond(500);
                
                $scope.deleteUser(userObj);
                $httpBackend.flush();
            });

            it('does not route to index', function () {
                expect($state.go).not.toHaveBeenCalledWith('users');
            });

            it('has a Failure status', function () {
                expect($scope.status).toBe('Failed...');
            });
        });
    });
});
