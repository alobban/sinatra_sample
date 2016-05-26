/**
 * Created by vagrant on 5/25/16.
 */

'use strict';

describe('AfnAddUserCtrl', function () {
    var userObj = {
        first_name: "James-Earl",
        last_name: "Smith",
        gender: "M",
        city: "Peoria",
        state: "IL"
    };

    var postData = {
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
            AfnAddUserCtrl = $injector.get('$controller')('AfnAddUserCtrl', {
                $scope: $scope
            });
        });

        spyOn($scope, 'createUser').and.callThrough();
        spyOn($state, 'go');
    });

    describe('Pre-post', function () {
        describe('when createUser method is called', function () {
            it('formats the user object argument to JSON', function () {
                var mapped = $scope.mapFields(userObj);

                expect(mapped).toEqual(postData);
            });
        });
    });

    describe('Successful Post', function () {
        xdescribe('when createUser method is called', function () {
            it('creates new record against the API server', function () {
                $httpBackend.expectPOST(apiUrl, postData).respond(201, {});
                
                $scope.createUser(userObj);
                $httpBackend.flush();
                
                expect().toBe(201);
            });
        });
        
        describe('after request has completed', function () {
            it('routes to user index page', function () {
                $httpBackend.whenPOST(apiUrl, postData).respond(201, {});

                $scope.createUser(userObj);
                $httpBackend.flush();
                
                expect($state.go).toHaveBeenCalledWith('users');
            })
        })
    });
});
