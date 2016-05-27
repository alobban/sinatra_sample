/**
 * Created by vagrant on 5/25/16.
 */

'use strict';

describe('AfnEditUserCtrl', function () {
    var userObj = {
        id: 3,
        first_name: "James-Earl",
        last_name: "Smith",
        gender: "M",
        city: "Peoria",
        state: "IL"
    };

    var putData = {
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
    var apiUrl = 'http://localhost:9393/user/';

    beforeEach(module('afnUser'));
    beforeEach(module('ui.router'));

    beforeEach(function () {
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            $state = $injector.get('$state');
            AfnAddUserCtrl = $injector.get('$controller')('AfnEditUserCtrl', {
                $scope: $scope
            });
        });

        spyOn($scope, 'updateUser').and.callThrough();
        spyOn($state, 'go');
        $scope.user = userObj;
    });

    describe('Cancel button clicked', function () {
        it('sets the user object to an empty object', function () {
            $scope.cancel();

            expect($state.go).toHaveBeenCalledWith('users');
        });
    });

    describe('Update button clicked', function () {

        it('formats the user object prior to Stringify step', function () {
            var mapped = $scope.mapFields(userObj);

            expect(mapped).toEqual(putData);
        });

        describe('When PUT request is successful', function () {
            beforeEach(function () {
                $httpBackend.whenPUT(apiUrl+$scope.user.id, putData).respond(200);
                $scope.updateUser(userObj);
                $httpBackend.flush();
            });

            it('routes to index', function () {
                expect($state.go).toHaveBeenCalledWith('users');
            });

            it('has a status', function () {
                expect($scope.status).toBe('Updating...');
            });
        });

        describe('When PUT request is unsuccessful', function () {
            beforeEach(function () {
                $httpBackend.whenPUT(apiUrl+$scope.user.id, putData).respond(500);
                $scope.updateUser(userObj);
                $httpBackend.flush();
            });

            it('routes to index', function () {
                expect($state.go).not.toHaveBeenCalledWith('users');
            });

            it('has a status', function () {
                expect($scope.status).toBe('Failed...');
            });
        });
    });
});
